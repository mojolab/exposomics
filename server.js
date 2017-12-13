import { Microservice } from '@doc.ai/microservice';
import path from 'path';
import { parse } from 'url';
import next from 'next';
import bodyParser from 'body-parser';
import serveStatic from 'serve-static';
import { BadRequest } from 'http-errors';
import { resetIdCounter } from 'react-tabs';
import moment from 'moment';
import config from './config';
import loadApps from './utils/loadApps';
import MongooseManager from './utils/MongooseManager';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const service = new Microservice(parseInt(config.get('port'), 10));

app.prepare().then(async () => {
  const appsEnabled = await loadApps();
  await MongooseManager.connect();

  service.app.use(bodyParser.json());

  ['/favicon.ico'].forEach(p => {
    service.app.get(p, serveStatic(path.resolve(__dirname, 'static')));
  });

  service.app.post('/api/places', async (req, res) => {
    try {
      const places = req.body.places.map((place, idx) => {
        const result = {};

        ['location', 'fromDate', 'toDate'].forEach(key => {
          if (!place[key]) {
            throw new BadRequest(`No ${key} is provided for place ${idx}`);
          }
        });

        // TODO: convert location to Location class and use the same also on frontend
        result.location = place.location;

        ['fromDate', 'toDate'].forEach(key => {
          try {
            result[key] = moment(new Date(place[key]));
          } catch (e) {
            throw new BadRequest(
              `Wrong ${key} is provided for place ${
                idx
              }. Expected ISO-8601 formatted string.`,
            );
          }
        });

        if (result.toDate.isBefore(result.fromDate)) {
          throw new BadRequest(
            `Wrong fromDate is provided for place ${
              idx
            }. It cannot be before toDate.`,
          );
        }

        // TODO: some more checks

        return result;
      });

      if (!places.length) {
        throw new BadRequest(
          'Please provide at least one place where you lived',
        );
      }

      const resultsArr = await Promise.all(
        appsEnabled.map(async item =>
          Object.assign({}, item, {
            results: await item.controller(places),
          }),
        ),
      );

      const results = {};
      resultsArr.forEach(item => {
        results[item.name] = item.results;
      });

      res.send(results);
    } catch (e) {
      res.status(e.statusCode || 500);
      res.send({
        name: e.name,
        message: e.message,
      });
    }
  });

  service.app.get('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    resetIdCounter();

    return app.render(req, res, pathname, query);
  });

  service.start();
});
