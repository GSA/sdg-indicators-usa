#!/bin/bash

# The following assumes the site is already built at _site.
bundle exec htmlproofer --allow-hash-href --disable-external ./_site
