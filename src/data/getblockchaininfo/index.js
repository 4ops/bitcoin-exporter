const client = require('prom-client');
const request = require('../request');
const schema = require('./schema.json');
const { prefix } = require('../../options').metrics;
const { createMetrics, updateMetrics } = require('../utils');

const methodName = 'getblockchaininfo';

const log = require('log').get(methodName);

const errorsCounter = new client.Counter({
  name: `${prefix}${methodName}_errors`,
  help: `Errors counter for method ${methodName}.`,
});

async function getBlockchainInfo() {
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

module.exports = getBlockchainInfo;
