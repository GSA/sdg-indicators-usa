# National Reporting Platform

## What is a National Reporting Platform (NRP)?

An NRP refers to an integrated web site, databases, and associated IT infrastructure to gather, host, secure, and display information. An SDG NRP is a tool to report national statistics, metadata, and related information for the global Sustainable Development Goal (SDG) indicators. Ideally, an SDG NRP has the following minimum characteristics:

* is managed by national statistical offices;
* features official statistics and metadata according to established standard methodology;
* is publicly accessible;
* allows for feedback from data users; and
* features open source (free) technology.

This power point [presentation](https://gsa.github.io/sdg-indicators/assets/documents/NRP%20Quickstart%204.28.17.pptx) (NRP Intro deck) and [webinar](https://drive.google.com/open?id=0BwiQGA4nFw7teHllemdLRkpZeGc) introduce the basics of the US NRP.

## Why choose an NRP?

An NRP tool facilitates national reporting by improving communication. NRPs:

* Gather, disseminate, and track national data on the SDG indicators, including identification of data gaps,
* Report national data to be harmonized for international purposes (i.e., global indicator database),
* Improve access to official national statistics and metadata, and
* Improve communication between data providers, NSOs, custodian agencies, and other stakeholders.

## What does the US NRP cost?

**There is no cost associated with copying the US NRP and using it for your own country or region.** Some NRPs are commercial, meaning there is a cost associated with using them. However, other NRPs, such as the US NRP, use open source technology. There are no hardware requirements, and the system and software requirements are free and minimal. The US NRP is hosted on the shared, free, open source collaboration platform called GitHub. Minimal staff time to copy, adapt, populate, and maintain the platform is also needed, and can be handled by part-time web developers, statisticians, and managers.

## What are the IT Requirements for the NRP?

For developers, the only software requirement is to install Git on your personal computer. We recommend installing Ruby also so that you can test your NRP website locally. Data managers and data providers do not require software beyond a web browser (we find Chrome works best). More advanced users will want to install Git locally as well.

### Specific Backend IT Requirements:

* [GitHub](https://github.com/): Use the website GitHub.com or [install GitHub](https://help.github.com/desktop/guides/getting-started/installing-github-desktop/#platform-mac) software.
* [Jekyll](http://jekyllbootstrap.com/): Use Jekyll to construct your webpage on GitHub. It uses the coding language [Ruby](https://www.ruby-lang.org/en/downloads/).
* [Prose.io](http://prose.io/): Use Prose.io to create, edit, delete, and save your content directly on GitHub.

### Specific Frontend IT Requirements:

* [U.S. Web Design Standards](https://standards.usa.gov/): U.S. Web Design Standards provides guides for developers and designers with design resources and code.
* [Chartist.js](https://gionkunz.github.io/chartist-js/): Chartist is a charting library that offers customizable and responsive charts.

### Recommended Skills (training links are included in the next section):

* Proficiency in Github, Git, and basic web development (e.g., HTML, CSS in order to set up the tool and repository).
* Proficiency in Javascript and Ruby to develop the tool.

## How Do We Create Our Own NRP?

There are four basic steps.

### A) Start with GitHub.

1. Create a GitHub account. Go to github.com and create an account.
2. Learn the basics of GitHub. Try this [introductory webinar](https://www.youtube.com/watch?v=uNa9GOtM6NE) and these [resources](https://www.digitalgov.gov/2014/06/11/the-api-briefing-quick-guide-to-using-github-fdas-openfda-research-project/).
3. Set up your GitHub organization and identify relevant users of your IT team. [Register](https://help.github.com/articles/creating-a-new-organization-from-scratch/) your organization with GitHub if not already registered. IT team members should set up their own GitHub accounts.

**Tip**: Within a GitHub organization, you can define ‘teams.’ This can be a useful way to identify users who are part of the project, improve communication among team members, and set specific permissions. See this [guide](https://help.github.com/articles/creating-a-team/) to learn more.

### B) Decide which platform to start with

Decide whether to fork the [US platform](https://github.com/gsa/sdg-indicators) or another version, such as the [UK platform](https://github.com/datasciencecampus/sdg-indicators). To inform this decision here is a [helpful comparison](https://github.com/datasciencecampus/sdg-indicators/wiki/Differences-between-the-US-and-UK-NRPs).

If you decide to start with a platform other than the US platform, you should stop here and visit the other platform for specialized instructions. For example, if using the UK platform, follow the instructions [here](https://github.com/datasciencecampus/sdg-indicators/wiki/How-do-we-create-our-own-NRP).

If you decide to start with the US platform, read on.

### C) Fork the repository

These steps will set up your organization's separate version of the NRP code.

1. Log into Github.com
2. Go to the [repository](https://github.com/GSA/sdg-indicators)
3. Click the "Fork" button in the upper right
4. When asked where to fork, chose your organization account (not your personal account)
5. When the forking is complete, you should be on this page: `https://github.com/[your organization]/sdg-indicators`

### D) Trigger a build of "Github Pages"

In order to turn the code into a website that can be visited in a browser, you simply need to edit any file.

1. In the list of files, click on `_translations` and then `header.md`.
2. Click the pencil icon in the upper right.
3. Under "en" (the English translations) change the "site-title" from "U.S. Indicators For The Sustainable Development Goals" to whatever you would like.
4. Scroll all the way to the bottom and click "Commit changes".
5. This triggers of a build of your site in Github Pages.
6. Visit the built site now in a browser at `https://[your-organization].github.io/sdg-indicators`

### E) Customize the platform

There are several places in the code where you may want to tweak the settings for your purposes. Here is a list of files and settings to change. None of these are required, but these are all places where the code is specific to the U.S. version of this platform.

* _config.yml, _config_prod.yml, and _config_staging.yml: You can update these settings:
  * title
  * org_name
  * ga_prod (for Google Analytics)
* _translations: You can update the language in all files in this folder. (See below for more on translations.)
* _includes/footer.html: You can update the Google Analytics section here.
* assets/img/favicons: You can update these images according to your own branding.

### F) Remove the U.S. statistics and metadata from the repository

The US NRP currently houses both the platform code and the SDG statistics and metadata in the same repository (in the `data` folder). This means that forking the US NRP will copy both the functionality of the platform as well as the US data. Therefore, countries will want to remove the US statistics and metadata from their copy of the US NRP and replace it with their own data (see below).

Scripted solutions for this task, which will replace the US data with example data, are planned for future releases.

## How Do We Put Our Own Statistics into the NRP?

In addition to hosting the NRP, you can use GitHub to collect input from data providers and maintain version control. There are five basic steps, but you can customize your approach as needed.

### A) Conduct a Needs Assessment

1. To assess availability of national data for reporting SDG indicators, we convened an Expert Group. This includes:
    * policy experts who have contributed to the formulation of sustainable development goals, targets, and the specification of indicators
    * Federal statistical agency experts engaged in the production of official Federal statistics relevant to the SDG indicators or contribute to the specification of SDG indicators.
2. This is the [web-based survey](https://gsa.github.io/sdg-indicators/training/) (USG SDG Data Needs Survey) we distributed to our Expert Group for our assessment.

### B) Identify Data Providers

1. The Expert Group identifies Federal data providers for each indicator for which Federal data are available. For statistical indicators, data providers are staff from Federal statistical agencies. For non-statistical indicators, data providers are generally staff from Federal policy agencies.
2. In some cases, the US is not able to identify suitable official data sources to calculate official national statistics for SDG indicators. In a portion of these, the US reports official statistics for similar (i.e., proxy) indicators. These are noted in the NRP national metadata under “Actual Indicator Reported.” In other cases, the US examines other, non-official data sources to assess their quality. If found suitable, the US documents (or “curates”) the data source, calculates an official statistic, and provides the appropriate metadata.

### C) Train Data Providers to Input National Statistics

1. Data providers submit statistics through their GitHub accounts using a spreadsheet interface.
2. For each indicator, data providers also submit national metadata to accompany the global metadata provided by UNSD. For a detailed explanation of how the US trained its data providers, watch this [webinar](https://www.youtube.com/watch?v=gPq3jB_sfFw) or read this [training manual](https://gsa.github.io/sdg-indicators/assets/documents/Training%20Guide%20for%20DATA%20PROVIDERS_v1(no%20overview)%20(1).pdf).

### D) Verify the Submitted Data

1. Statistics and metadata submitted by providers are routed to a non-public staging area on GitHub for review. Then, a notice is sent to reviewers by email from GitHub.
2. You authorize reviewers of submissions. When an email notice is received, the reviewer clicks on a GitHub link included in the email, and then selects a specific review (or ‘pull’) request. The data provider and her/his exact changes will be visible to your reviewer.
3. Reviewers examine submissions for incompleteness or function errors. They can then approve by clicking on ‘Confirm Merge,’ request clarifications or additional information from data providers using ‘Comment,’ or disapprove by clicking on ‘Close.’

### E) Report National Statistics

1. After you have approved the submission from your data provider, the statistics and metadata will be viewable to the public.
2. In the US, we update our NRP through a clearly marked ‘staging’ or testing site before merging with the ‘master,’ or official site that the public can find online. This guide describes how to refresh the master site with content from the staging site.

## Translations

To translate the content into other languages, there are 3 things to do:

### A) Translate the text of includes and layouts

The `_translations` folder contains simple translations of various phrases/words found in the HTML files in `_includes` and `_layouts`. These are straightforward and can be edited and extended using the existing syntax.

**Note**: Indentation and white-space is always important when using this syntax, sometimes referred to as "front matter" or "YAML".

When adding a new language, use an abbreviation that contains only lowercase letters and (optionally) dashes. For example: `de` for German, `br` for Portuguese - Brazil, `fr-ca` for French Canadian, etc.

### B) Translate indicator and goal metadata

In the `data` folder, each language can have a subfolder that contains versions of the `sdg_goals.csv` and `sdg_indicator_metadata.csv` files.

### C) Translate individual Markdown pages

In any folders that contain Markdown (.md) files, each language can have a subfolder that contains translated versions of those Markdown files. Here are some examples of where these subfolders might go:

* The root folder of the repository
* The `_goals` folder
* The `_indicators` folder

## Local development

In order to run the site locally, you'll need to [install Ruby](https://www.ruby-lang.org/en/documentation/installation/).

Then, from on a Bash-like terminal, install the "Gem" for Github Pages:

`gem install gh-pages`

Finally, launch the site with:

`jekyll serve`

You can then visit the site in the browser at [http://127.0.0.1:4000/sdg-indicators/](http://127.0.0.1:4000/sdg-indicators/).
