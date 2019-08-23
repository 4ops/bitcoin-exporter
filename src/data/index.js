const client = require('prom-client');
const getBlockchainInfo = require('./getblockchaininfo');
const getMempoolInfo = require('./getmempoolinfo');
const getNetworkInfo = require('./getnetworkinfo');
const getChainTxStats = require('./getchaintxstats');

async function update() {
  await getBlockchainInfo();
  await getMempoolInfo();
  await getNetworkInfo();
  await getChainTxStats();
}

async function exportAsString() {
  await update();
  return client.register.metrics();
}

async function exportAsJSON() {
  await update();
  return client.register.getMetricsAsJSON();
}

module.exports = {
  asString: exportAsString,
  asJSON: exportAsJSON,
};
