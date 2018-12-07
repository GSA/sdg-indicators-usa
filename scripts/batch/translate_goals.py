# -*- coding: utf-8 -*-
"""
Create multilingual .md files for indicators.
"""

import glob
import os.path
import frontmatter

def translate_goal(goal):
    with open(goal, 'r') as f:
        post = frontmatter.load(f)
        permalink = post.metadata['permalink']

        for language in ['es', 'fr']:
            new_permalink = '/' + language + permalink
            post.metadata['permalink'] = new_permalink
            post.metadata['language'] = language
            translated_goal = goal.replace('_goals', os.path.join('_goals', language))
            with open(translated_goal, 'w') as f:
                f.write(frontmatter.dumps(post))

    return True

def main():
    """Update all all of the indicators in the metadata folder."""

    status = True

    # Read all the files in the source location.
    goals = glob.glob("_goals/*.md")
    print("Attempting to translate " + str(len(goals)) + " goal files...")

    for goal in goals:
        status = status & translate_goal(goal)

    return status

if __name__ == '__main__':
    if not main():
        raise RuntimeError("Failed to translate goals")
    else:
        print("Success")
