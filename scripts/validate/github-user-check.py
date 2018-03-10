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

print('Checking user permissions...')

# Get the github-users.yml file data.
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

    # Exit now if the author is not in our list.
    user = response['author']['login']
    if user not in users:
      raise RuntimeError("User '%s' is not in approved list of users." % user)

    # Also exit now if the author is an administrator.
    if 'administrator' == users[user]:
      print("-- User '%s' is an administrator: skipping Github user check." % user)
      sys.exit(0)

  else:
    # Validate the list of indicators if specified.
    if 'indicators' in users[user]:
      for indicator in users[user]['indicators']:
        if indicator not in change:
          raise RuntimeError("Changed file '%s' is outside list of indicators for user '%s'." % (change, user))
    # Validate the list of folders if specified.
    if 'folders' in users[user]:
      for folder in users[user]['folders']:
        if folder not in change:
          raise RuntimeError("Changed file '%s' is outside list of folders for user '%s'." % (change, user))

    # If still here, give feedback.
    print("-- change permitted: %s" % change)

# No exceptions, so we report success.
print('Success')