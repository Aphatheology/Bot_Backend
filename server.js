require('dotenv').config();

const app = require('./app');
const config = require('./src/config/config');
const logger = require('./src/config/logger');

const server =
    config.env !== 'test'
        ? app.listen(config.port, () => {
              logger.info(
                  `Server started and app listening on port ${config.port}`
              );
          })
        : app.listen(() => {
              logger.info(`Server started and app listening in test mode`);
          });

module.exports = server;
