require('log-node')();

const startServer = require('./server');
const metricsData = require('./data');
const app = startServer(metricsData);

module.exports = app;
