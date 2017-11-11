# National Reporting Platform

## What is a National Reporting Platform (NRP)?

An NRP refers to an integrated web site, databases, and
associated IT infrastructure to gather, host, secure, and
display information. An SDG NRP is a tool to report
national statistics, metadata, and related information for
the global Sustainable Development Goal (SDG)
indicators. Ideally, an SDG NRP has the following
minimum characteristics:

* is managed by national statistical offices;
* features official statistics and metadata according to established standard methodology;
* is publicly accessible;
* allows for feedback from data users; and
* features open source (free) technology.

This power point [presentation](https://gsa.github.io/sdg-indicators/training/) (NRP Intro deck) and [webinar](https://www.youtube.com/watch?v=uNa9GOtM6NE) introduce the basics of the US NRP.

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

* [GitHub](https://github.com/): Use the website GitHub and [install GitHub](https://help.github.com/desktop/guides/getting-started/installing-github-desktop/#platform-mac) software. [Host the NRP](https://help.github.com/articles/supported-browsers/) on either Chrome, Firefox, Safari, Microsoft Edge, or Internet Explorer.
* [Jekyll](http://jekyllbootstrap.com/): Use [Jekyll](http://jekyllrb.com/docs/installation/) to construct your webpage on GitHub. It uses the coding language [Ruby](https://www.ruby-lang.org/en/downloads/).
* [Prose.io](http://prose.io/): Use [Prose.io](https://github.com/prose/prose) to create, edit, delete, and save your content directly on GitHub.

### Specific Frontend IT Requirements:

* [U.S. Web Design Standards](https://standards.usa.gov/): U.S. Web Design Standards provides guides for developers and designers with design resources and code.
* [Chartist.js](https://gionkunz.github.io/chartist-js/): Chartist is a charting library that offers customizable and responsive charts.

### Recommended Skills (training links are included in the next section):

* Proficiency in Github, Git, and basic web development (e.g., html, css in order to set up the tool and repository).
* Proficiency in Javascript and Ruby to develop the tool.

## How Do We Create Our Own NRP?

There are four basic steps.

### Step 1: Start with GitHub.

a. Create a GitHub account. Go to github.com and create an account.
b. Learn the basics of GitHub. Try this [introductory webinar](https://www.youtube.com/watch?v=uNa9GOtM6NE) and these [resources](https://www.digitalgov.gov/2014/06/11/the-api-briefing-quick-guide-to-using-github-fdas-openfda-research-project/).
c. Set up your GitHub organization and identify relevant users of your IT team. [Register](https://help.github.com/articles/creating-a-new-organization-from-scratch/) your organization with GitHub if not already registered. IT team members should set up their own GitHub accounts.

**Tip**: Within a GitHub organization, you can define ‘teams.’ This can be a useful way to identify users who are part of the project, improve communication among team members, and set specific permissions. See this [guide](https://help.github.com/articles/creating-a-team/) to learn more.

### Step 2: Fork or “copy” the NRP code

a. Sign in to GitHub and go to either the [US](https://github.com/gsa/sdg-indicators) or the [UK](https://github.com/datasciencecampus/sdg-indicators) platform and click the ‘Fork’ button at the top right. This creates a complete copy of the code and the statistics. This power point presentation and webinar walk through each step.
b. Your own NRP website address will then be named https://<YOUR-ORG>.github.io/sdg-indicators/. Note: You must complete the steps below before your NRP will function.

### Step 3: Customize your NRP

a. Edit configuration files.
b. Grant prose.io access to the repository.
c. Remove the US statistics and metadata from the repository. The US NRP currently files both the platform code and the SDG statistics and metadata in the same repository (or folder). This means that forking the US NRP will copy both the US data and its style sheets. Therefore, countries will want to remove the US statistics and metadata from their copy of the US NRP. See the script in Python the UK used to do this. The script can also be written in R (free statistical software).

### Step 4: Turn the NRP code into a Website using Jekyll

a. Learn how to host a website with GitHub here.
b. To convert a forked NRP into a website, go to Settings and switch to Master Branch under GitHub pages. This generates a 404 link for your NRP website.

## How Do We Put Our Own Statistics into the NRP?

In addition to hosting the NRP, we used GitHub to collect input from data providers and maintain version control using five basic steps. You can customize your approach as needed.

### Step 1: Conduct a Needs Assessment

a. To assess availability of national data for reporting SDG indicators, we convened an Expert Group. This includes 1) policy experts who have contributed to the formulation of sustainable development goals, targets, and the specification of indicators and 2) Federal statistical agency experts engaged in the production of official Federal statistics relevant to the SDG indicators or contribute to the specification of SDG indicators.
b. This is the [web-based survey](https://gsa.github.io/sdg-indicators/training/) (USG SDG Data Needs Survey) we distributed to our Expert Group for our assessment.

### Step 2: Identify Data Providers

a. The Expert Group identifies Federal data providers for each indicator for which Federal data are available. For statistical indicators, data providers are staff from Federal statistical agencies. For non-statistical indicators, data providers are generally staff from Federal policy agencies.
b. In some cases, the US is not able to identify suitable official data sources to calculate official national statistics for SDG indicators. In a portion of these, the US reports official statistics for similar (i.e., proxy) indicators. These are noted in the NRP national metadata under “Actual Indicator Reported.” In other cases, the US examines other, non-official data sources to assess their quality. If found suitable, the US documents (or “curates”) the data source, calculates an official statistic, and provides the appropriate metadata.

### Step 3: Train Data Providers to Input National Statistics

a. Data providers submit statistics through their GitHub accounts using a spreadsheet interface.
b. For each indicator, data providers also submit national metadata to accompany the global metadata provided by UNSD. For a detailed explanation of how the US trained its data providers, watch this [webinar](https://www.youtube.com/watch?v=gPq3jB_sfFw) or read this [training manual](https://github.com/GSA/sdg-indicators/issues/457).

### Step 4: Verify the Submitted Data

a. Statistics and metadata submitted by providers are routed to a non-public staging area on GitHub for review. Then, a notice is sent to reviewers by email from GitHub.
b. You authorize reviewers of submissions. When an email notice is received, the reviewer clicks on a GitHub link included in the email, and then selects a specific review (or ‘pull’) request. The data provider and her/his exact changes will be visible to your reviewer.
c. Reviewers examine submissions for incompleteness or function errors. They can then approve by clicking on ‘Confirm Merge,’ request clarifications or additional information from data providers using ‘Comment,’ or disapprove by clicking on ‘Close.’

### Step 5: Report National Statistics

a. After you have approved the submission from your data provider, the statistics and metadata will be viewable to the public.
b. In the US, we update our NRP through a clearly marked ‘staging’ or testing site before merging with the ‘master,’ or official site that the public can find online. This guide describes how to refresh the master site with content from the staging site.
