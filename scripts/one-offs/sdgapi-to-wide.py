# -*- coding: utf-8 -*-
"""
An import script to gather all available indicator from the SDGAPI
service and save it as CSV files. This is a proof-of-concept for
importing data from an external source, rather than maintaining it
through Prose.io and Github. The SDGAPI (https://unstats.un.org/SDGAPI/swagger/)
is currently a test version, and does not contain accurate data.
"""

import glob
import os.path
import requests
import pandas as pd

REQUEST_URL = 'https://unstats.un.org/SDGAPI/v1/sdg/Indicator/Data'

# TODO: This is not actually reliable. Need to figure it out from data.
def concept_code_variation(concepts):
    concepts_with_variation = {}
    for concept in concepts:
        if len(concept['codes']) > 1:
            concept_codes = []
            for code_object in concept['codes']:
                concept_codes.append(code_object['code'])
            concepts_with_variation[concept['id']] = concept_codes
    return concepts_with_variation

indicator_files = glob.glob(os.path.join('_indicators', '*.md'))
for indicator in indicator_files:

    # Parse the indicator code.
    indicator = indicator.replace('_indicators' + os.sep, '')
    indicator = indicator.replace('.md', '')
    indicator = indicator.replace('-', '.')

    if indicator != '2.1.2':
        continue

    # Request and parse the response from the API.
    parameters = {
        'areaCode': '840',
        'pageSize': 900,
        'indicator': indicator
    }
    response = requests.get(REQUEST_URL, params=parameters)
    data = response.json()

    # First see if there is any variation in attributes/dimensions.
    attributes_with_variation = concept_code_variation(data['attributes'])
    dimensions_with_variation = concept_code_variation(data['dimensions'])
    all_concepts_with_variation = {}
    all_concepts_with_variation.update(attributes_with_variation)
    all_concepts_with_variation.update(dimensions_with_variation)

    # To generate our output, we'll construct a table row-by-row. This
    # is not typical Pandas practice, but works fine in this case. We'll
    # start with a blank table with a column (int) for years.
    df = pd.DataFrame({'year': []})
    df['year'] = df['year'].astype('int')

    # Loop through the rows of data populating a dict of years.
    years = dict()
    for row in data['data']:
        # Construct the column name from dimension/attribute values.
        column_segments = []
        row_concepts = {}
        row_concepts.update(row['attributes'])
        row_concepts.update(row['dimensions'])
        for concept_id in row_concepts:
            if concept_id in all_concepts_with_variation:
                column_segments.append(concept_id + ':' + row_concepts[concept_id])
        # Sort the segments in order to normalize the column names.
        column_segments.sort()
        # Make sure the column name is at least 'all', if nothing else.
        if not column_segments:
            column_segments.append('all')
        # Create the column name and add to DataFrame if needed.
        column_name = '|'.join(column_segments)
        if column_name not in df.columns:
            df[column_name] = ''
        # Make sure the year is in the years dict.
        year = row['timePeriodStart']
        if year not in years:
            years[year] = {}
        # Add the value.
        years[year][column_name] = row['value']

    df = pd.DataFrame.from_dict(years, orient='index')
    df.index = df.index.astype(int)

    # Write the results to the CSV file.
    if not df.empty:
        csv_path = os.path.join('data', 'indicator_' + indicator.replace('.', '-') + '.csv')
        df.to_csv(csv_path, index_label='year', float_format='%.2f')
        print('Saved ' + csv_path + '...')
