# **“CAN YOU PREDICT HEALTH FROM WHAT YOU HAVE BEEN EXPOSED TO?”**

Before birth, our exposures to various environmental stressors begins. Expos-omic measures all the exposures of an individual in a  lifetime and how those exposures relate to health. Using “omic” techniques the collected exposure data can be linked to biochemical and molecular changes in our body. By understanding the impact of these exposomes, for the first time we are able to create a holistic profile of each individual’s health and risk for diseases.

How do people connect to and describe quantitatively what we have been exposed to? Unfortunately, exposomics data, like other sources of data, have never been aggregated or studied in conjunction with other health data points. That’s why doc.ai, an AI-powered healthcare startup based in Silicon Valley , has created this open-source Exposomics challenge. We believe a collaboration between data scientists and developer communities is the best way to extract health insights from the richest exposomic datasets around us!

For more information on the contest, [check out our website](doc-ai.github.io/exposomics).

# **THE EXPOSOMIC CHALLENGE**
([…for more info](https://doc-ai.github.io/exposomics/manual/details.html))

The challenge is hosted on doc.ai Exposomic repository. The goal of this challenge is to design a microapp and write extensions to the doc.ai exposomic module. The best extensions will be integrated into doc ai solution that performs DL computations on all other quantified biology to improve health and accelerate scientific research.


**Local Installation:**
- Install Homebrew: `brew install`
- Install Node.js via homebrew : `brew install node`
- Install dependencies via yarn: `yarn install`
- Install MongoDB: [Use this guide](https://docs.mongodb.com/getting-started/shell/installation/) to set up MongoDB on your machine and run a local database server.
- Install Git Large File Storage via homebrew: `brew install git-lfs`
- Import json data into local repo: `git lfs pull`
- Import data into your local database service: `node apps/airQuality/server/data/import_data.js`
- If you will add your own data source (instead of using our Air Quality data), we have example scripts used for our database at `apps/airQuality/server/data/prepare_data.py`

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
