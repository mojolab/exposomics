import config from './config';
import pkg from './package.json';

module.exports = {
  'process.env.PUBLIC_URL': config.get('publicUrl'),
  'process.env.GOOGLE_MAPS_API_KEY': config.get('googleMapsApiKey'),
  'process.env.APP_VERSION': pkg.version,
};
