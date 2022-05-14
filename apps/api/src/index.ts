import fastify from 'fastify';
// import fp from 'fastify-plugin';

import plugins from './plugins';
import services from './services';

const server = fastify({
  logger: {
    prettyPrint:
      process.env.NODE_ENV === 'development'
        ? {
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname',
          }
        : false,
  },
});

(async () => {
  // Custom plugins
  await server.register(plugins);

  // Custom services
  await server.register(services);

  // Listen
  await server.listen(5000, '0.0.0.0', (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    server.log.info(server.printRoutes({ commonPrefix: false }));
  });
})();
