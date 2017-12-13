require('dotenv').config();
const nconf = require('nconf');
const nconfYAML = require('nconf-yaml');

module.exports = nconf
  .argv()
  .env('__')
  .file({
    file: 'config.yml',
    format: nconfYAML,
  });
