/* eslint no-console:0 */

import mongoose from 'mongoose';
import config from '../config';

mongoose.Promise = Promise;

export default class MongooseManager {
  static connect() {
    if (!MongooseManager.promise) {
      MongooseManager.promise = new Promise((resolve, reject) => {
        mongoose.connect(config.get('mongo'), { useMongoClient: true }, err => {
          if (err) {
            console.error(`> Error connecting to MongoDB: ${err.message}`);
            reject(err);
            return;
          }

          console.info('> Connected to MongoDB');
          resolve(mongoose);
        });
      });
    }

    return MongooseManager.promise;
  }

  static disconnect() {
    mongoose.connection.close();
    MongooseManager.promise = null;
    console.info('> Disconnected from MongoDB');
  }
}
