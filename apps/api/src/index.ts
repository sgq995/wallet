import fastify, { FastifyServerOptions } from 'fastify';
// import fp from 'fastify-plugin';

import plugins from './plugins';
import services from './services/v1';

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

const app = fastify({
  logger: envToLogger[env] ?? true,
});

void (async () => {
  // Custom plugins
  await app.register(plugins);

  // Endpoints
  await app.register(services);

  // Listen
  app.listen(
    {
      port: config.app.port,
      host: config.app.host,
    },
    (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      app.log.info(app.printRoutes({ commonPrefix: false }));
    }
  );
})();
