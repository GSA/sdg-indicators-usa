# -*- coding: utf-8 -*-
"""
This is a validation script to make sure that the frontmatter (metadata) for all
indicators matches the json-schema provided in the following file:
/scripts/validate/indicator-metadata-schema.json
"""

import glob
import json
import datetime
import frontmatter
from jsonschema import validate, FormatChecker, ValidationError

def prepare_metadata(raw):
    prepared = {}
    for key in raw:
        if isinstance(raw[key], datetime.date):
            # The frontmatter.load function makes dates into datetime.date
            # objects, which isn't what we want here. So we have to convert
            # them back to strings so that jsonschema can validate them.
            prepared[key] = raw[key].strftime('%Y-%m-%d')
        else:
            prepared[key] = raw[key]
    return prepared

def main():
    status = True
    with open('scripts/validate/indicator-metadata-schema.json') as stream:
        schema = json.load(stream)

    indicators = glob.glob('_indicators/*.md')
    indicators.sort()
    for indicator_file in indicators:
        with open(indicator_file) as stream:
            indicator = frontmatter.load(stream)
            metadata = prepare_metadata(indicator.metadata)
            try:
                validate(metadata, schema, format_checker=FormatChecker())
            except ValidationError as error:
                status = False
                print(indicator_file, error.message, list(error.schema_path))
    return status

if __name__ == '__main__':
    status = main()
    if not status:
        raise RuntimeError('Failed indicator metadata validation.')
    else:
        print('Success')
