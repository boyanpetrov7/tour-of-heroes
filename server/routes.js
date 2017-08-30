const api = require('express').Router();
const app = require('./controllers/app.js');

api.use('/', app);

module.exports = api;
