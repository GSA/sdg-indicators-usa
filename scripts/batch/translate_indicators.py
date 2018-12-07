# -*- coding: utf-8 -*-
"""
Create multilingual .md files for indicators.
"""

import glob
import os.path
import frontmatter

def translate_indicator(indicator):
    with open(indicator, 'r') as f:
        post = frontmatter.load(f)
        permalink = post.metadata['permalink']

        for language in ['es', 'fr']:
            new_permalink = '/' + language + permalink
            post.metadata['permalink'] = new_permalink
            post.metadata['language'] = language
            translated_indicator = indicator.replace('_indicators', os.path.join('_indicators', language))
            with open(translated_indicator, 'w') as f:
                f.write(frontmatter.dumps(post))

    return True

def main():
    """Update all all of the indicators in the metadata folder."""

    status = True

    # Read all the files in the source location.
    indicators = glob.glob("_indicators/*.md")
    print("Attempting to translate " + str(len(indicators)) + " indicator files...")

    for indicator in indicators:
        status = status & translate_indicator(indicator)

    return status

if __name__ == '__main__':
    if not main():
        raise RuntimeError("Failed to translate indicators")
    else:
        print("Success")
