const mongoose = require('mongoose');

module.exports = (config, logger) => {
  const username = config.username;
  const password = config.password;
  const host = config.host;
  const port = config.port;
  const database = config.database;
  const connectionString = `mongodb://${username}:${password}@${host}:${port}/${database}`;

  logger.info(`# Connecting to: ${connectionString}`);

  mongoose.connect(connectionString);

  const db = mongoose;

  return db;
};
