# -*- coding: utf-8 -*-
"""
An import script to gather all available indicator from the SDGAPI
service and save it as CSV files. This is a proof-of-concept for
importing data from an external source, rather than maintaining it
through Prose.io and Github. The SDGAPI (https://unstats.un.org/SDGAPI/swagger/)
is currently a test version, and does not contain accurate data.

This script goes to some lengths to save the data as "wide" CSV format, but
with a minimum of columns. A further improvement would probably be some way to
identify which column should represent the aggregate "all" values. This would
probably need to be a mapping (dict) of indicator codes to series codes. Eg:
AGGREGATES = {
    '2.1.2': 'AG_PRD_FIESS',
    '3.2.2': 'SH_DYN_NMRTN',
    etc...
}
"""

import glob
import os.path
import requests
import pandas as pd

REQUEST_URL = 'https://unstats.un.org/SDGAPI/v1/sdg/Indicator/Data'

def main():

    # Loop through all the Markdown files in the _indicators folder.
    indicator_files = glob.glob(os.path.join('_indicators', '*.md'))
    for indicator in indicator_files:

        # Parse the indicator code.
        indicator = indicator.replace('_indicators' + os.sep, '')
        indicator = indicator.replace('.md', '')
        indicator = indicator.replace('-', '.')

        # Request and parse the response from the API.
        parameters = {
            'areaCode': '840',
            'pageSize': 900,
            'indicator': indicator
        }
        response = requests.get(REQUEST_URL, params=parameters)
        data = response.json()

        # First see if there is any variation in attributes/dimensions by
        # generating a count of the attributes/dimensions used in the data.
        concept_codes_in_use = {}
        for row in data['data']:
            for concept_type in ['attributes', 'dimensions']:
                for concept_id in row[concept_type]:
                    if concept_id not in concept_codes_in_use:
                        concept_codes_in_use[concept_id] = {}
                    concept_code = row[concept_type][concept_id]
                    if concept_code not in concept_codes_in_use[concept_id]:
                        concept_codes_in_use[concept_id][concept_code] = True

        # Filter the concept_codes_in_use to the concept IDs that use more than one
        # concept code, because we only care about the ones with some variation.
        concepts_with_variation = {k: v for k, v in concept_codes_in_use.items() if len(v) > 1}

        # Loop through the rows of data populating a dict of years.
        years = dict()
        # We also need to track with columns are floats.
        columns_that_are_floats = dict()
        for row in data['data']:
            # Construct the column name from dimension/attribute values.
            column_segments = []
            # Lump together the attributes and dimensions to find all of concepts
            # that we care about (ie, the ones with variation).
            row_concepts = {}
            row_concepts.update(row['attributes'])
            row_concepts.update(row['dimensions'])
            for concept_id in row_concepts:
                if concept_id in concepts_with_variation:
                    column_segments.append(concept_id + ':' + row_concepts[concept_id])
            # Sort the segments in order to normalize the column names.
            column_segments.sort()
            # Make sure the column name is at least 'all', if nothing else.
            if not column_segments:
                column_segments.append('all')
            # Create the column name.
            column_name = '|'.join(column_segments)
            # Make sure the year is in the years dict.
            year = row['timePeriodStart']
            if year not in years:
                years[year] = {}
            # Add the value.
            years[year][column_name] = row['value']
            # Track whether the value was a float.
            if row['valueType'] == 'Float':
                columns_that_are_floats[column_name] = True

        # Convert the dict into a DataFrame indexed by year.
        df = pd.DataFrame.from_dict(years, orient='index')
        # The year column ends up as a float unless we convert it here.
        df.index = df.index.astype(int)
        # Also convert some other columns to floats.
        for column_name in columns_that_are_floats:
            df[column_name] = df[column_name].astype(float)

        # Write the results to the CSV file.
        if not df.empty:
            csv_path = os.path.join('data', 'indicator_' + indicator.replace('.', '-') + '.csv')
            df.to_csv(csv_path, index_label='year', float_format='%g')
            print('Saved ' + csv_path + '...')

if __name__ == '__main__':
    main()
