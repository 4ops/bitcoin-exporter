const log = require('log').get('request');
const axios = require('axios');
const { name, version } = require('../../package.json');
const { scheme, user, password, host, port } = require('../options').bitcoin;
const url = `${scheme}://${user}:${password}@${host}:${port}`;

const headers = {
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'application/json;charset=utf-8',
  'User-Agent': `${name}/${version}`,
};

async function request(method, ...params) {
  const requestConfig = {
    headers,
    method: 'POST',
    url,
    data: {
      jsonrpc: '2.0',
      id: +new Date(),
      method,
      params,
    },
  };

  try {
    const response = await axios(requestConfig);
    const { result, error } = response.data;
    return { result, error };
  } catch (error) {
    log.warn(`Request failed for method "${method}": ${error.message}`);
    return { error };
  }
}

module.exports = request;
