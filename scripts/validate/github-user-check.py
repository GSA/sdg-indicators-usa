# -*- coding: utf-8 -*-
"""
This is a validation script to make sure that pending pull requests have been
submitted by a valid user. This script is mostly informed by the Yaml file in
the same folder: github-user-list.yml.
"""

import os.path
import sys
import yaml
import subprocess
import requests
import fnmatch

# We only need to protect certain folders that contain data and/or metadata.
PROTECTED_FOLDERS = ['data/', '_indicators/']

print('Checking user permissions...')

# Get the github-user-list.yml file data.
file_path = os.path.join('scripts', 'validate', 'github-user-list.yml')
with open(file_path, 'r') as stream:
    try:
        users = yaml.load(stream)
    except yaml.YAMLError as e:
        print(e)
        sys.exit(1)

# Load the Jekyll _config.yml to get the Github repository information.
file_path = '_config.yml'
with open(file_path, 'r') as stream:
    try:
        site = yaml.load(stream)
    except yaml.YAMLError as e:
        print(e)
        sys.exit(1)

# Get the files changed in the commits.
cmd = ['git', 'diff-tree', '--name-only', '-r', 'HEAD']
proc = subprocess.Popen(cmd, stdout=subprocess.PIPE)

# Loop through the lines of output that the above Git command produced.
for index, line in enumerate(proc.stdout.readlines()):
  change = line.decode('utf-8').strip()
  if index == 0:
    # The first line is the commit ID, which we use to get the Github user.
    commit_id = change
    github_api_request = "https://api.github.com/repos/%s/%s/commits/%s" \
      % (site['org_name'], site['repo_name'], commit_id)
    try:
      response = requests.get(github_api_request).json()
    except requests.exceptions.RequestException as e:
      print(e)
      sys.exit(1)

    # Exit now if the author is an administrator.
    user = response['author']['login']
    if user in users and 'administrator' == users[user]:
      print("-- User '%s' is an administrator: skipping Github user check." % user)
      sys.exit(0)

  else:
    # We only care about certain folders, so skip all others.
    is_protected_folder = False
    for protected_folder in PROTECTED_FOLDERS:
      if change.startswith(protected_folder):
        is_protected_folder = True

    # Test the changed files against the allowed indicators for the user.
    if is_protected_folder:
      indicator_listed = 'indicators' in users[user]
      indicator_matched = False
      if indicator_listed:
        for indicator in users[user]['indicators']:
          if fnmatch.fnmatch(change, '*' + indicator + '*'):
            indicator_matched = True

      if not indicator_listed or not indicator_matched:
        raise RuntimeError("Changed file '%s' is not in list of allowed indicators for user '%s'." % (change, user))

    # If still here, give feedback.
    print("-- change permitted: %s" % change)

# No exceptions, so we report success.
print('Success')