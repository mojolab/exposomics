import path from 'path';
import fs from 'fs-extra';

const APPS_DIR = path.resolve(__dirname, '..', 'apps');
const CONTROLLER_FILE_NAME = 'server/Controller.js';

module.exports = async () => {
  let result = await fs.readdir(APPS_DIR);

  result = result
    .map(name => {
      const dir = path.resolve(APPS_DIR, name);
      const controllerFile = path.resolve(dir, CONTROLLER_FILE_NAME);

      if (!fs.lstatSync(dir).isDirectory()) {
        return null;
      }

      if (!fs.lstatSync(controllerFile).isFile()) {
        return null;
      }

      return {
        name,
        dir,
        controllerFile,
        controller: require(controllerFile), // eslint-disable-line
      };
    })
    .filter(Boolean);

  return result;
};
