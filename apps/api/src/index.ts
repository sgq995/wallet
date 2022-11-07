import fastify, { FastifyServerOptions } from 'fastify';
// import fp from 'fastify-plugin';

import plugins from './plugins';
import services from './services';

import config from './config';

const envToLogger: Record<string, FastifyServerOptions['logger']> = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  production: true,
  test: false,
};

const env = process.env.NODE_ENV ?? 'default';

const server = fastify({
  logger: envToLogger[env] ?? true,
});

void (async () => {
  // Custom plugins
  await server.register(plugins);

  // Custom services
  await server.register(services);

  // Listen
  server.listen(config.app.port, config.app.host, (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    server.log.info(server.printRoutes({ commonPrefix: false }));
  });
})();
