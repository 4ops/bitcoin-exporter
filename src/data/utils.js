const log = require('log-stderr');
const client = require('prom-client');
const { prefix } = require('../options').metrics;
const metrics = [];

function setGaugeValue(gauge, value) {
  const valueType = typeof value;

  if (valueType === 'string') {
    gauge.set({ value }, 1);
  } else if (valueType === 'boolean') {
    gauge.set(value === true ? 1 : 0);
  } else if (valueType === 'number') {
    gauge.set(value);
  } else {
    throw new Error(
      `Unknow value type "${valueType}" for gauge "${gauge.name}"`,
    );
  }
}

function createMetrics(schema) {
  for (const key in schema) {
    log.debug(`creating new metric for schema item "${key}"`);

    // eslint-disable-next-line security/detect-object-injection
    const schemaItem = schema[key];
    const { help, metricType, labelNames } = schemaItem;
    const name = `${prefix}${schemaItem.name}`;

    let metricItem;

    switch (metricType) {
      case 'Gauge':
        metricItem = new client.Gauge({ name, help, labelNames });
        break;
      case 'Counter':
        metricItem = new client.Counter({ name, help, labelNames });
        break;
      default:
        throw new Error(`Unknow metric type "${metricType}"`);
    }

    schemaItem.index = metrics.push(metricItem) - 1;
  }

  log.debug('metric items created');
}

function updateMetrics(schema, result) {
  for (const key in result) {
    if (!Object.prototype.hasOwnProperty.call(schema, key)) continue;

    // eslint-disable-next-line security/detect-object-injection
    const schemaItem = schema[key];
    const { index, metricType } = schemaItem;

    // eslint-disable-next-line security/detect-object-injection
    const value = result[key];

    // eslint-disable-next-line security/detect-object-injection
    const metricItem = metrics[index];

    switch (metricType) {
      case 'Gauge':
        setGaugeValue(metricItem, value);
        break;
      case 'Counter':
        metricItem.set(value);
        break;
      default:
        throw new Error(`Unknow metric type "${metricType}"`);
    }
  }
}

module.exports = {
  createMetrics,
  updateMetrics,
};
