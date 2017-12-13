import mongoose from 'mongoose';
import { logger } from '@doc.ai/microservice';
import config from '../config';

mongoose.Promise = Promise;

class MongooseManager {
  static connect() {
    if (!MongooseManager.promise) {
      MongooseManager.promise = new Promise((resolve, reject) => {
        mongoose.connect(config.get('mongo'), { useMongoClient: true }, err => {
          if (err) {
            logger.error('Error connecting to MongoDB', {
              message: err.message,
            });
            reject(err);
            return;
          }

          logger.info('Connected to MongoDB');
          resolve(mongoose);
        });
      });
    }

    return MongooseManager.promise;
  }

  static disconnect() {
    mongoose.connection.close();
    MongooseManager.promise = null;
    logger.info('Disconnected from MongoDB');
  }
}

module.exports = MongooseManager;
