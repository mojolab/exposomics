1. Download fake data from some very official source or just put some random data to raw.csv
2. Execute `python apps/airQuality/server/data/prepare_data.py` to prepare data in correct JSON format
3. Run `node apps/airQuality/server/data/import_data.js` to import all data from JSON to MongoDB
