# **“CAN YOU PREDICT HEALTH FROM WHAT YOU HAVE BEEN EXPOSED TO?”**

[![Build Status](https://travis-ci.org/doc-ai/exposomics.svg?branch=master)](https://travis-ci.org/doc-ai/exposomics)
[![Greenkeeper badge](https://badges.greenkeeper.io/doc-ai/exposomics.svg)](https://greenkeeper.io/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Before birth, our exposures to various environmental stressors begins. Expos-omic measures all the exposures of an individual in a  lifetime and how those exposures relate to health. Using “omic” techniques the collected exposure data can be linked to biochemical and molecular changes in our body. By understanding the impact of these exposomes, for the first time we are able to create a holistic profile of each individual’s health and risk for diseases.

How do people connect to and describe quantitatively what we have been exposed to? Unfortunately, exposomics data, like other sources of data, have never been aggregated or studied in conjunction with other health data points. That’s why doc.ai, an AI-powered healthcare startup based in Silicon Valley , has created this open-source Exposomics challenge. We believe a collaboration between data scientists and developer communities is the best way to extract health insights from the richest exposomic datasets around us!

For more information on the contest, [check out our documents](https://doc-ai.github.io/exposomics/).



# **THE EXPOSOMIC CHALLENGE**
[Contest details linked here](https://doc-ai.github.io/exposomics/manual/details.html)

### [CHECKOUT OUR LIVE DEMO](https://exposomics.doc.ai)

The challenge is hosted on doc.ai Exposomic repository. The goal of this challenge is to design a microapp and write extensions to the doc.ai exposomic module. The best extensions will be integrated into doc ai solution that performs DL computations on all other quantified biology to improve health and accelerate scientific research.

![Landing page](https://doc-ai.github.io/exposomics/manual/asset/expo.gif)

## How to participate
1. Complete our [registration form](https://goo.gl/forms/hZX1r5CIHJC76vBA3). 
2. Create and submit a new issue, following the template we've provided. This includes listing all names, github accounts, and emails of everyone contributing to your project, and a brief (~1-2 paragraph) description of your proposed work.
3. Fork the [repository](https://github.com/doc-ai/exposomics) and create your branch from `master`.
4. Complete [local installation instructions](https://github.com/doc-ai/exposomics/blob/master/README.md#local-installation).
5. Submit a pull request with a reference to your issue number (#IssueNumber), so your PR links directly to your issue submission.
6. Upon a successful testing and code review, we will merge your branch into `master` and evaulate your entry for contest awards.

#### Clone repository
- Clone this repository to your working folder: `git clone https://github.com/doc-ai/exposomics.git`
- Open project folder: `cd exposomics`

#### Install required software

#### MAC OS
- Install Homebrew: `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
- Install Node.js via homebrew : `brew install node`
- Install dependencies via yarn: `yarn install`
- Install MongoDB: [Use this guide](https://docs.mongodb.com/getting-started/shell/installation/) to set up MongoDB on your machine and run a local database server.

#### Linux
- Install Node.js: [Use this guide](https://nodejs.org/en/download/package-manager/) to install Node.js for your Linux distribution
- Install dependencies via npm: `npm install`
- Install MongoDB: [Use this guide](https://docs.mongodb.com/getting-started/shell/installation/) to set up MongoDB on your machine and run a local database server.

#### Local Installation
- Download the raw data and prepare for import: `python apps/airQuality/server/data/prepare_data.py`
- Import data into your local database service: `node apps/airQuality/server/data/import_data.js`
<!-- - If you will add your own data source (instead of using our Air Quality data), we have example scripts used for our database at `apps/airQuality/server/data/prepare_data.py` -->

**Modifications**
- Note: for new developers that only want to make basic modifications, all your changes will probably be made to the `apps/airQuality/server/Controller.js` file. That file has the logic that actually queries the database and constructs a dataset to be rendered.

**Core Contributors:**
- @alexdocai - 	Alex Kwiatkowski | doc.ai
- @apurvmishra - Apurv Mishra | doc.ai
- @BohdanTkachenko - Bohdan Tkachenko | doc.ai
- @irod973 - Irving Rodriguez | doc.ai
- @lizalopez - Liza Lopez | doc.ai
- @MariiaTkachenko - Mariia Tkachenko | doc.ai
- @xanf- Illya Klymov | doc.ai
