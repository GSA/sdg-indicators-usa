#!/bin/bash

# The following script assumes the site is already built at _site.

# Figure out the Jekyll baseurl. If this doesn't work for some reason, you can
# just hardcode it, eg: JEKYLL_BASEURL="/my-baseurl"
JEKYLL_BASEURL=/$GITHUB_REPOSITORY_NAME_PART
# We have to create a temporary folder to test in, because html-proofer does not
# like Jekyll's "baseurl", and interprets most links as broken.
mkdir -p ./_test$JEKYLL_BASEURL &&
cp -r ./_site/* ./_test$JEKYLL_BASEURL/ &&
touch ./_test/index.html &&
bundle exec htmlproofer --allow-hash-href --disable-external ./_test &&
rm -rf ./_test
