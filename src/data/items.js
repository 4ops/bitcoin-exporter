const { prefix } = require('../options').metrics;
const client = require('prom-client');

// Self

const exporter_errors = new client.Counter({
  name: `${prefix}_exporter_errors`,
  help: 'Errors count',
});

// method: getblockchaininfo

const chain = new client.Gauge({
  name: `${prefix}_chain`,
  help: 'Blockchain name - value in labels',
  labelNames: ['value'],
});

const blocks = new client.Gauge({
  name: `${prefix}_blocks`,
  help: 'Blocks count',
});

const headers = new client.Gauge({
  name: `${prefix}_headers`,
  help: 'Headers count',
});

const bestblockhash = new client.Gauge({
  name: `${prefix}_bestblockhash`,
  help: 'Best block hash - value in labels',
  labelNames: ['value'],
});

const difficulty = new client.Gauge({
  name: `${prefix}_difficulty`,
  help: `${prefix}_difficulty`,
});

const mediantime = new client.Gauge({
  name: `${prefix}_mediantime`,
  help: `${prefix}_mediantime`,
});

const verificationprogress = new client.Gauge({
  name: `${prefix}_verificationprogress`,
  help: `${prefix}_verificationprogress`,
});

const initialblockdownload = new client.Gauge({
  name: `${prefix}_initialblockdownload`,
  help: `${prefix}_initialblockdownload`,
});

const chainwork = new client.Gauge({
  name: `${prefix}_chainwork`,
  help: `${prefix}_chainwork`,
  labelNames: ['value'],
});

const size_on_disk = new client.Gauge({
  name: `${prefix}_size_on_disk`,
  help: `${prefix}_size_on_disk`,
});

const pruned = new client.Gauge({
  name: `${prefix}_pruned`,
  help: `${prefix}_pruned`,
});

const warnings = new client.Gauge({
  name: `${prefix}_warnings`,
  help: 'Warnings - value in labels',
  labelNames: ['value'],
});

// method: getchaintxstats

const txcount = new client.Gauge({
  name: `${prefix}_txcount`,
  help: `${prefix}_txcount`,
});

const window_final_block_hash = new client.Gauge({
  name: `${prefix}_window_final_block_hash`,
  help: `${prefix}_window_final_block_hash`,
});

const window_block_count = new client.Gauge({
  name: `${prefix}_window_block_count`,
  help: `${prefix}_window_block_count`,
});

const window_tx_count = new client.Gauge({
  name: `${prefix}_window_tx_count`,
  help: `${prefix}_window_tx_count`,
});

const window_interval = new client.Gauge({
  name: `${prefix}_window_interval`,
  help: `${prefix}_window_interval`,
});

const txrate = new client.Gauge({
  name: `${prefix}_txrate`,
  help: `${prefix}_txrate`,
});

// method: getmempoolinfo

const mempool_size = new client.Gauge({
  name: `${prefix}_mempool_size`,
  help: `${prefix}_mempool_size`,
});

const mempool_bytes = new client.Gauge({
  name: `${prefix}_mempool_bytes`,
  help: `${prefix}_mempool_bytes`,
});

const mempool_usage = new client.Gauge({
  name: `${prefix}_mempool_usage`,
  help: `${prefix}_mempool_usage`,
});

const maxmempool = new client.Gauge({
  name: `${prefix}_maxmempool`,
  help: `${prefix}_maxmempool`,
});

const mempoolminfee = new client.Gauge({
  name: `${prefix}_mempoolminfee`,
  help: `${prefix}_mempoolminfee`,
});

const minrelaytxfee = new client.Gauge({
  name: `${prefix}_minrelaytxfee`,
  help: `${prefix}_minrelaytxfee`,
});

// method: getnetworkinfo

const version = new client.Gauge({
  name: `${prefix}_version`,
  help: `${prefix}_version`,
});

const subversion = new client.Gauge({
  name: `${prefix}_subversion`,
  help: 'Client version - value in labels',
});

const protocolversion = new client.Gauge({
  name: `${prefix}_protocolversion`,
  help: `${prefix}_protocolversion`,
});

const networkactive = new client.Gauge({
  name: `${prefix}_networkactive`,
  help: `${prefix}_networkactive`,
});

const connections = new client.Gauge({
  name: `${prefix}_connections`,
  help: `${prefix}_connections`,
});

module.exports = {
  data: async () => client.register.metrics(),
  // Self
  exporter_errors,
  // method: getblockchaininfo
  chain,
  blocks,
  headers,
  bestblockhash,
  difficulty,
  mediantime,
  verificationprogress,
  initialblockdownload,
  chainwork,
  size_on_disk,
  pruned,
  warnings,
  // method: getchaintxstats
  txcount,
  window_final_block_hash,
  window_block_count,
  window_tx_count,
  window_interval,
  txrate,
  // method: getmempoolinfo
  mempool_size,
  mempool_bytes,
  mempool_usage,
  maxmempool,
  mempoolminfee,
  minrelaytxfee,
  // method: getnetworkinfo
  version,
  subversion,
  protocolversion,
  networkactive,
  connections,
};
