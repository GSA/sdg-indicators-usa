# CircleCI deployment scripts

This set of scripts supports testing/deployment through CircleCI.

## Assumptions/definitions

These steps assume you have set up 2 Github.com accounts (organisations):

1. The staging organisation: All development/changes will happen here.
1. The production organisation: Only automated deployments will happen here.

## Deployment keys

You'll need to create some SSH keys for deployment. Here are some commands to accomplish this on the command line:
```
mkdir ~/sdg-keys
cd ~/sdg-keys
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
[for file name, enter "sdg-indicators-stg", and for passphrase just press Enter]
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
[for file name, enter "sdg-indicators-prod", and for passphrase just press Enter]
```
This should give you 2 SSH key pairs:
* ~/sdg-keys/sdg-indicators-stg
* ~/sdg-keys/sdg-indicators-stg.pub
* ~/sdg-keys/sdg-indicators-prod
* ~/sdg-keys/sdg-indicators-prod.pub

### Installing keys on Github

1. Login to Github.com as your staging organisation.
1. Go to the "Deploy keys" page, for example:
   https://github.com/[YOUR_STAGING_ORGANISATION]/sdg-indicators/settings/keys
1. Click "Add deploy key"
1. Give it any Title you'd like, and paste in the contents of `~/sdg-keys/sdg-indicators-stg.pub`
1. Check the "Allow write access" box and click "Add key"

Now we'll repeat for your production organisation.

1. Login to Github.com as your production organisation.
1. Go to the "Deploy keys" page, for example:
   https://github.com/[YOUR_PROD_ORGANISATION]/sdg-indicators/settings/keys
1. Click "Add deploy key"
1. Give it any Title you'd like, and paste in the contents of `~/sdg-keys/sdg-indicators-prod.pub`
1. Check the "Allow write access" box and click "Add key"

### Installing the keys on CircleCI

1. Log into Github.com as your staging organisation.
1. In the same browser, go to [CircleCI](https://circleci.com/vcs-authorize/)
   and click "Log in with GitHub".
1. Make sure you see your staging organisation in the top-left dropdown.
1. Click on "Add Projects".
1. Across from "sdg-indicators" click "Setup project".
1. Leave everything as-is, scroll down and click "Start building".
   (You may see tests attempt to run and fail - this is expected.)
1. Go to the "SSH Permissions" page, for example:
   https://circleci.com/gh/[YOUR_STAGING_ORGANISATION/sdg-indicators/edit#ssh

IMPORTANT: For the following the steps, the "Hostname" should be copied exactly!

1. Click "Add SSH Key"
1. Enter a hostname of `gh-stg`
1. Copy into "Private key" the contents of `~/sdg-keys/sdg-indicators-stg`.
1. Click "Add SSH Key"
1. Enter a hostname of `gh-prod`
1. Copy into "Private key" the contents of `~/sdg-keys/sdg-indicators-prod`.

### Setting CircleCI variables

1. Go to the "Environment Variables" page, eg:
   https://circleci.com/gh/[YOUR_STAGING_ORGANISATION]/sdg-indicators/edit#env-vars
1. Use the "Add variable" button to add the following variables:
    * Name: GH_EMAIL
      Value: [the email address to associate with automated deployments]
    * Name: GH_NAME
      Value: [the name to associate with automated deployments]
    * Name: GH_ORG_PROD
      Value: [the name of your production organisation]
    * Name: GH_ORG_STG
      Value: [the name of your staging organisation]

### Updating the SSH key fingerprints

1. Go to the "SSH Permissions" page, for example:
   https://circleci.com/gh/[YOUR_STAGING_ORGANISATION/sdg-indicators/edit#ssh
   * You should now see 2 "fingerprints" (you may need to refresh). You'll be
     copying those into a versioned file in this repository.
1. Open the .circleci/config.yml file.
1. Look for the "fingerprints" entry under "deploy_staging", and change it to match the CircleCI fingerprint for `gh-stg`.
1. Look for the "fingerprints" entry under "deploy_prod", and change it to match the CircleCI fingerprint for `gh-prod`.

## What have we done?

At this point, the following workflow is in-place for your staging organisation:

* Whenever a pull-request is submitted, CircleCI will automatically run tests against it. [NOT YET IMPLEMENTED]
* Whenever a pull-request is merged into the `develop` branch, CircleCI will automatically deploy the build to the staging site: `https://[YOUR_STG_ORGANISATION].github.io/sdg-indicators`.
* Whenever a pull-request is merged into the `master` branch, CircleCI will automatically deploy the build to the production site: `https://[YOUR_PROD_ORGANISATION].github.io`.
