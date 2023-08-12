require('dotenv').config();

const app = require('./app');
const config = require('./src/config/config');
const logger = require('./src/config/logger');

const startServer = async () => {
	try {
		app.listen(config.port);
        logger.info(`Server started and app listening on port ${config.port}`)
	} catch (error) {
		logger.error(error);
	}
};

startServer();
