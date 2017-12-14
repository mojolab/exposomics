/* eslint no-console:0, no-restricted-syntax:0, no-await-in-loop:0 */

import fs from 'fs';
import JSONStream from 'JSONStream';
import es from 'event-stream';
// const ProgressBar = require('progress');
import MongooseManager from '../../../../utils/MongooseManager';
import AirQualityRecord from '../models/AirQualityRecord';

// const data = require('./data.json');

async function importData() {
  await MongooseManager.connect();
  await AirQualityRecord.remove();

  // const bar = new ProgressBar(
  //   `      > [:bar] :percent      :current / :total      ETA :etas  `,
  //   {
  //     total: data.length,
  //     clear: true,
  //   },
  // );

  return new Promise((resolve, reject) => {
    fs
      .createReadStream('apps/airQuality/server/data/json/data.json')
      .pipe(JSONStream.parse('*'))
      .pipe(
        es.mapSync(async item => {
          const record = new AirQualityRecord(item);
          await record.save();

          // bar.tick();
        }),
      )
      .on('end', async () => {
        await MongooseManager.disconnect();
        resolve();
      })
      .on('error', reject);
  });
}

importData()
  .then(() => {
    console.log('Data imported');
  })
  .catch(e => {
    console.error(e);
  });
