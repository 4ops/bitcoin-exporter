# Bitcoin exporter

[![](https://images.microbadger.com/badges/image/4ops/bitcoin-exporter.svg)](https://hub.docker.com/r/4ops/bitcoin-exporter 'View on Docker Hub') [![install size](https://packagephobia.now.sh/badge?p=bitcoin-exporter)](https://packagephobia.now.sh/result?p=bitcoin-exporter)

Bitcoin node metrics exporter for Prometheus.

Example [metrics data](https://github.com/4ops/bitcoin-exporter/blob/master/examples/metrics.txt).

# Compatibility

Tested with bitcoin RPC clients:

- Bitcoin Core `0.18.1`
- Bitcoin-ABC `0.20.0`
- Bitcoin SV `0.2.1`

# Installation

## Docker

Put in your `docker-compose.yml`

```YAML
  exporter:
    image: 4ops/bitcoin-exporter:v0.1.1
    ports:
      - '9133:9133'
    environment:
      BITCOIN_RPCUSER: 'some_eusername'
      BITCOIN_RPCPASSWORD: 'sEcReT_P@sSsW0Rd'
      BITCOIN_RPCHOST: 'bitcoin.mycompany.org'
      BITCOIN_RPCPORT: '8332'
```

See full example in [docker](https://github.com/4ops/bitcoin-exporter/tree/master/examples/docker) directory.

## Kubernetes

Example spec for `bitcoin-exporter` container:

```YAML
  - env:
    - name: BITCOIN_RPCUSER
      valueFrom:
        secretKeyRef:
          name: bitcoin-credentials
          key: BITCOIN_RPCUSER
    - name: BITCOIN_RPCPASSWORD
      valueFrom:
        secretKeyRef:
          name: bitcoin-credentials
          key: BITCOIN_RPCPASSWORD
    - name: BITCOIN_RPCHOST
      value: bitcoin.mycompany.org
    - name: BITCOIN_RPCPORT
      value: '18332'
  image: 4ops/bitcoin-exporter:v0.1.1
  readinessProbe:
    httpGet:
      path: /metrics
      port: http-metrics
    timeoutSeconds: 3
    initialDelaySeconds: 5
    periodSeconds: 10
  name: metrics-exporter
  ports:
    - containerPort: 9133
      name: http-metrics
      protocol: TCP
  resources:
    requests:
      cpu: 100m
      memory: 200Mi
    limits:
      cpu: 100m
      memory: 200Mi
  securityContext:
    allowPrivilegeEscalation: false
    runAsGroup: 1000
    runAsUser: 1000
    procMount: Default
```

See full example in [kubernetes](https://github.com/4ops/bitcoin-exporter/tree/master/examples/kubernetes) directory.

# Configuration

Bitcoin exporter reads environments variables at startup. No more config files are required.

## Bitcoin node options

### Required variables

- `BITCOIN_RPCUSER`, `BITCOIN_RPCPASSWORD` - bitcoin node RPC credentials.
- `BITCOIN_RPCHOST` - hostname or IP address of bitcoin node.
- `BITCOIN_RPCPORT` - port number for RPC connections.

### Not required

- `BITCOIN_RPCSCHEME` - `http` or `https`. Default: `http`

## Metrics options

- `METRICS_URL` - path for prometheus scrapes. Default: `/metrics`
- `METRICS_PORT` - metrics server port number. Default: `9133`
- `METRICS_PREFIX` - prefix for naming metrics. Default: `bitcoin_`

## Logging

- `LOG_LEVEL` - logging verbosity level. Maybe on of: `debug`, `info`, `notice`, `warn`, `warning`, `error`. Default: `notice`
- `LOG_DEBUG` - eventual list of namespaces to expose at levels below LOG_LEVEL threshold. Just set valu `*` if you need to turn on logging. See more information at [log](https://github.com/medikoo/log#log_debug)
- `LOG_TIME` - timestamp format in logs. Default - none. Maybe one of: `rel` for time elapsed since running or `abs` for absolute timestamps (ISO 8601 format).
