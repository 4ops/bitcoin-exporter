const client = require('prom-client');
const request = require('../request');
const schema = require('./schema.json');
const { prefix } = require('../../options').metrics;
const { createMetrics, updateMetrics } = require('../utils');

const methodName = 'getnetworkinfo';

const log = require('log-stderr');

const errorsCounter = new client.Counter({
  name: `${prefix}${methodName}_errors`,
  help: `Errors counter for method ${methodName}.`,
});

async function getNetworkInfo() {
  const { result, error } = await request(methodName);

  if (error) return errorsCounter.inc();

  try {
    updateMetrics(schema, result);
  } catch (error) {
    errorsCounter.inc();
    log.error(`Failed to parse result: ${error.message}`);
  }
}

createMetrics(schema);

module.exports = getNetworkInfo;
