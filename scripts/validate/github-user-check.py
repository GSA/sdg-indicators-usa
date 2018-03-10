# -*- coding: utf-8 -*-
"""
This is a validation script to make sure that pending pull requests have been
submitted by a valid user.
"""

import os.path
import yaml
import subprocess

print('Checking user permissions...')

# Get the github-users.yml file data.
scripts_path = os.path.join('scripts', 'validate', 'github-users.yml')
with open(scripts_path, 'r') as stream:
    try:
        users = yaml.load(stream)
    except yaml.YAMLError as e:
        print(e)

# Get the author of the commits.
cmd = ['git', 'log', '--format="%ae"', 'HEAD^!']
user = subprocess.check_output(cmd).decode('utf-8').strip().strip('"')

# Exit now if the author is not in our list.
if user not in users:
  raise RuntimeError('User "' + user + '" is not in approved list of users.')

# Get the files changed in the commits.
cmd = ['git', 'diff-tree', '--no-commit-id', '--name-only', '-r', 'HEAD']
proc = subprocess.Popen(cmd, stdout=subprocess.PIPE)
for line in proc.stdout.readlines():
  change = line.decode('utf-8').strip()
  # Validate the list of indicators if specified.
  if 'indicators' in users[user]:
    for indicator in users[user]['indicators']:
      if indicator not in change:
        raise RuntimeError('Changed file "' + change + '" is outside list of indicators for user "' + user + '".')
  # Validate the list of folders if specified.
  if 'folders' in users[user]:
    for folder in users[user]['folders']:
      if folder not in change:
        raise RuntimeError('Changed file "' + change + '" is outside list of folders for user "' + user + '".')
  print('-- change permitted: ' + change)

print('Success')