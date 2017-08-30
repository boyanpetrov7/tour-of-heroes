const dev = require('./development.json');
const prod = require('./production.json');

let config;
if (process.env.NODE_ENV === 'development') {
  config = dev;
} else {
  config = prod;
}

module.exports = config;
