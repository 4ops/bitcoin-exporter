const bitcoin = {
  user: process.env.BITCOIN_RPCUSER,
  password: process.env.BITCOIN_RPCPASSWORD,
  host: process.env.BITCOIN_RPCHOST,
  port: process.env.BITCOIN_RPCPORT,
  scheme: process.env.BITCOIN_RPCSCHEME || 'http',
};

module.exports = bitcoin;
