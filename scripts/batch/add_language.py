"""
This script adds a new language to this implementation of Open SDG.

Usage example: the following would add Spanish (es) as a new language:
    python scripts/batch/add_language.py es

What this script actually does:
1. This script creates new copies of all goals, indicators, and pages, in the new
language.

What this script does NOT do:
1. This script does not update the "languages" array in _config.yml, which
is a required step. You must do that manually.
2. This script does not do any translation.
"""
import shutil
import fileinput
import glob
import sys
import os

def add_language(new_language, language_public):
    # We only care about one folder.
    folders = ['_pages', '_posts']
    for folder in folders:
        new_folder = os.path.join(folder, new_language)
        # Abort if folder already exists.
        if os.path.isdir(new_folder):
            print('Folder already exists: ' + new_folder)
            continue
        # Create the folder.
        os.mkdir(new_folder)
        # Copy all files (but no folders) into the new folder.
        for filename in os.listdir(folder):
            source_file = os.path.join(folder, filename)
            new_file = os.path.join(new_folder, filename)
            if os.path.isdir(source_file):
                continue
            shutil.copyfile(source_file, new_file)
        # Change the copied files to reflect the new language.
        for line in fileinput.input(glob.glob(new_folder + '/*'), inplace=True):
            # Look for the permalink line, and add the language.
            if line.startswith('permalink: /'):
                sys.stdout.write(line.replace('permalink: /', 'permalink: /' + language_public + '/'))
                sys.stdout.write('language: ' + new_language + '\n')
            elif not line.startswith('language: '):
                sys.stdout.write(line)

def main():

    # Abort if there is no parameter provided.
    if len(sys.argv) < 2:
        sys.exit('Provide a 2-letter abbreviation for the new language. Optionally also provide a second alternative abbreviation to use in permalinks.')
    language = sys.argv[1]
    language_public = language
    if len(sys.argv) == 3:
        language_public = sys.argv[2]
    add_language(language, language_public)
    print("Don't forget to update the 'languages' list in _config.yml!")

# Boilerplace syntax for running the main function.
if __name__ == '__main__':
    main()
