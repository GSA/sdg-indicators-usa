[![GitHub Actions](https://github.com/GSA/sdg-indicators-usa/actions/workflows/build.yml/badge.svg)](https://github.com/GSA/sdg-indicators-usa/actions/workflows/build.yml)
[![GitHub Actions](https://github.com/GSA/sdg-indicators-usa/actions/workflows/qa.yml/badge.svg)](https://github.com/GSA/sdg-indicators-usa/actions/workflows/qa.yml)

# Sustainable Development Goal indicators

This is a development website for collecting and disseminating US data for the Sustainable Development Goal global indicators.

For any guidance on how to use the website or develop it further for your own country, please refer to the [wiki](https://github.com/ONSdigital/sdg-indicators/wiki).

### Requirements

-   [Ruby](https://www.ruby-lang.org/en/) = 2.6.0
-   [Bundler](https://bundler.io/) > 2.0
-   [Node](https://nodejs.org/en/download/) > 16.0

NOTE: You must build this repo with Ruby 2.6.0. 
### Setup

After you've confirmed the above requirements, all lifecycle operations can be run with NPM scripts (ex. `npm run build`)

| NPM Command | Description                     |
| ----------- | ------------------------------- |
| build       | Build the site                  |
| setup       | Install ruby gems               |
| start       | Serve a local build             |
| test        | Check for broken internal links |
| qa          | Check for broken external links |


## Contributing

See [CONTRIBUTING](CONTRIBUTING.md) for additional information.

This site is automatically published based on the branch.

| Branch    | Environment | URL                                                   | Description                                                         |
| --------- | ----------- | ----------------------------------------------------- | ------------------------------------------------------------------- |
| `develop` | staging     | [sdg-staging.data.gov](https://sdg-staging.data.gov/) | Ad-hoc development and reviewing significant changes with partners. |
| `main`    | production  | [sdg.data.gov](https://sdg.data.gov/)                 | Production instance of sdg.data.gov.                                |

Federalist automatically builds previews for all branches. Changes to `main` are
automatically published to [sdg.data.gov](https://sdg.data.gov/).
Feature branches should be branched from `main`.

`develop` is used ad-hoc in order to preview significant changes with partners
and is not part of the development workflow.

## Public domain

This project is in the worldwide [public domain](LICENSE.md). As stated in [CONTRIBUTING](CONTRIBUTING.md):

> This project is in the public domain within the United States, and copyright and related rights in the work worldwide are waived through the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).
>
> All contributions to this project will be released under the CC0 dedication. By submitting a pull request, you are agreeing to comply with this waiver of copyright interest.
