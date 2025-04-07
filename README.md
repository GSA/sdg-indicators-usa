# Open SDG - Site starter

This is a starter repository to help in implementing the [Open SDG](https://github.com/open-sdg/open-sdg) platform. [See here for documentation](https://open-sdg.readthedocs.io).

## Requirements

-   [Ruby](https://www.ruby-lang.org/en/) > 3.0
-   [Bundler](https://bundler.io/) > 2.0

## Usage
| Command | Description |
|---------|-------------|
| `bundle install` | install the current dependencies |
| `bundle exec jekyll build` | build the site. dumps to `_site` |
| `bundle exec jekyll serve` | builds the site and serves it locally |

## Publication 
- the static sites created using this repo are configured to be published by pages.cloud.gov via webhooks. For more information on cloud.gov pages visit the [website](https://cloud.gov/pages/)

## Requirements

-   [Ruby](https://www.ruby-lang.org/en/) = 2.6.0
-   [Bundler](https://bundler.io/) > 2.0
-   [Node](https://nodejs.org/en/download/) > 16.0

NOTE: You must build this repo with Ruby 2.6.0. 

## Setup

After you've confirmed the above requirements, all lifecycle operations can be run with NPM scripts (ex. `npm run build`)

| NPM Command | Description                     |
| ----------- | ------------------------------- |
| build       | Build the site                  |
| setup       | Install ruby gems               |
| start       | Serve a local build             |
| test        | Check for broken internal links |
| qa          | Check for broken external links |

## Broken Links

We run a [weekly QA cron job](https://github.com/GSA/sdg-indicators-usa/actions/workflows/qa.yml) to test for broken links.

Any errors the QA job finds will be added to the [📌 Link Checker Report](https://github.com/GSA/sdg-indicators-usa/issues/1140).

False positives, or URLs you wish to ignore can be put in the `.lycheeignore` file. This supports regex matching as well.

This job can also be run locally. Install instructions here: https://lychee.cli.rs/installation/

Then run with args: `lychee --base=https://sdg.data.gov .`

## Contributing

See [CONTRIBUTING](CONTRIBUTING.md) for additional information.

This site is automatically published based on the branch.

## Public domain

This project is in the worldwide [public domain](LICENSE.md). As stated in [CONTRIBUTING](CONTRIBUTING.md):

> This project is in the public domain within the United States, and copyright and related rights in the work worldwide are waived through the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).
>
> All contributions to this project will be released under the CC0 dedication. By submitting a pull request, you are agreeing to comply with this waiver of copyright interest.
