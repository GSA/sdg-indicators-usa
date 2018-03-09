# -*- coding: utf-8 -*-
"""
This is a validation script to make sure that pending pull requests have been
submitted by a valid user.
"""

import os.path
import yaml
import git

scripts_path = os.path.join('scripts', 'validate', 'github-users.yml')
with open(scripts_path, 'r') as stream:
    try:
        users = yaml.load(stream)
    except yaml.YAMLError as e:
        print(e)

g = git.cmd.Git('.')
print(g.status())