const metrics = {
  url: process.env.METRICS_URL || '/metrics',
  port: process.env.METRICS_PORT || 9133,
  prefix: process.env.METRICS_PREFIX || 'bitcoin_',
};

module.exports = metrics;
