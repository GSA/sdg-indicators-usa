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

    # Convert the response into a DataFrame.
    df = pd.DataFrame(data['data'])
    if df.empty:
        continue

    # Normalize and reduce the columns used.
    if df['valueType'].iloc[0] == 'Float':
        df['value'] = df['value'].astype(float)
    df = df[['series', 'timePeriodStart', 'value']]
    df = df.rename({'timePeriodStart': 'year'}, axis='columns')
    df['year'] = df['year'].astype(int)

    # If there is only one series, treat it as 'all'.
    units = df['series'].unique()
    if len(units) == 1:
        df = df.rename({'value': 'all'}, axis='columns')
        df = df.drop('series', axis='columns')
        df = df.drop_duplicates(subset='year')
    # Otherwise treat each series as a 'unit' of 'all'.
    else:
        # Start a new dataframe with only the years.
        df_with_all_units = pd.DataFrame({'year': df['year'].unique()})
        for unit in units:
            # For each series, merge that in as a new "all|unit:x" column.
            column_name = 'all|unit:' + unit
            df_with_this_unit = df[df['series'] == unit] \
                .drop('series', axis='columns')          \
                .rename({'value': column_name}, axis='columns')
            # Remove duplicate years.
            df_with_this_unit = df_with_this_unit.drop_duplicates(subset='year')
            # Merge it in.
            df_with_all_units = df_with_all_units.merge(df_with_this_unit, on='year', how='outer')
        # Replace original dataframe with the new one.
        df = df_with_all_units

    # Write the results to the CSV file.
    csv_path = os.path.join('data', 'indicator_' + indicator.replace('.', '-') + '.csv')
    df.to_csv(csv_path, index=False, float_format='%.2f')
    print('Saved ' + csv_path + '...')
