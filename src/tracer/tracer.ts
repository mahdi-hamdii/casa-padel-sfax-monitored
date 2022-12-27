import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
'use strict';

import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';
import * as opentelemetry from '@opentelemetry/sdk-node';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

// Configure the SDK to export telemetry data to the console
// Enable all auto-instrumentations from the meta package
const hostName = process.env.OTEL_TRACE_HOST || 'localhost'

const options = {
  tags: [],
  endpoint: `http://${hostName}:14268/api/traces`,
}

const traceExporter = new JaegerExporter(options);


// const traceExporter = new OTLPTraceExporter(exporterOptions);
const sdk = new opentelemetry.NodeSDK({
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations()],
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'casa-padel-sfax',
    [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: "dev",

  }),
});


// initialize the SDK and register with the OpenTelemetry API
// this enables the API to record telemetry
sdk
  .start()
  .then(() => console.log('Tracing initialized'))
  .catch((error) => console.log('Error initializing tracing', error));

// gracefully shut down the SDK on process exit
process.on('SIGTERM', () => {
  sdk
    .shutdown()
    .then(() => console.log('Tracing terminated'))
    .catch((error) => console.log('Error terminating tracing', error))
    .finally(() => process.exit(0));
});

export default sdk;
