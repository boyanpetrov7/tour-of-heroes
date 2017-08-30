const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Log = require('log');

const PORT = process.env.PORT || 3080;

const config = require('../config/config.js');

const logger = new Log(config.logLevel);
const mongodbConfig = config.datasources.mongodb;

logger.info(`# Running server in : ${process.env.NODE_ENV} mode`);

const mongodb = require('./db.js')(mongodbConfig, logger);

const app = express();
const routes = require('./routes.js');

// set
app.set('config', config);
app.set('mongodb', mongodb);

// use
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.SERVE_STATIC) {
  logger.info(`# Serving static files from : ${path.resolve(__dirname, '../dist')}`);
  app.use('/', express.static(path.resolve(__dirname, '../dist')));
}

app.use(routes);

mongodb.connection.once('open', () => {
  logger.info('# Connected to database');
  app.listen(PORT, () => {
    logger.info(`# Listening on ${PORT}`);
  });
});

module.exports = app;
