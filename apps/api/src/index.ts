import fastify from 'fastify';
import fp from 'fastify-plugin';

import plugins from './plugins';
import services from './services';

const server = fastify();

// Custom plugins
server.register(plugins);

// Custom services
server.register(services);

// Listen
server.listen(8080, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server listening at ${address}`);
});
