/* eslint no-console:0 */

import path from 'path';
import fs from 'fs-extra';
import airQuality from './apps/airQuality/server/prepareData';

const DATA_DIR_RELATIVE = 'db';
const DATA_DIR = path.resolve(__dirname, DATA_DIR_RELATIVE);

const dataSetsFns = [airQuality];

async function main() {
  await fs.remove(DATA_DIR);
  await fs.ensureDir(DATA_DIR);

  for (const dataSetsFn of dataSetsFns) {
    const createdFiles = await dataSetsFn(DATA_DIR);

    console.log('HERE', createdFiles);

    createdFiles.forEach(fileName => {
      console.log(`> Created DB file ${DATA_DIR_RELATIVE}/${fileName}`);
    });
  }
}

main()
  .then(() => {
    console.log('> Data is ready to import');
  })
  .catch(e => {
    console.error(e);
  });
