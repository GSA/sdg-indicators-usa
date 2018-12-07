#!/bin/bash

# The following script assumes the site is already built at _site.

# Figure out the Jekyll baseurl. If this doesn't work for some reason, you can
# just hardcode it, eg: JEKYLL_BASEURL="/my-baseurl"
JEKYLL_BASEURL=$(
  grep "^baseurl: " _config.yml | # Look for 'baseurl' in the Jekyll config.
  head -n1                      | # Only use the first one.
  awk '{ print $2}'             | # Use the value part, after the colon.
  sed -e 's/^"//' -e 's/"$//'     # Strip any quotes.
)
# We have to create a temporary folder to test in, because html-proofer does not
# like Jekyll's "baseurl", and interprets most links as broken.
mkdir -p ./_test$JEKYLL_BASEURL &&
cp -r ./_site/* ./_test$JEKYLL_BASEURL/ &&
touch ./_test/index.html &&
bundle exec htmlproofer --disable-external ./_test &&
rm -rf ./_test
