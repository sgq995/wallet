import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import config from './config';
import { IController } from './models/controller.model';
import { IFramework } from './models/framework.model';
import { AsyncAppModule } from './models/module.model';
import { HttpError, httpStatusToString } from './utilities/http.utility';

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

async function runApp() {
  try {
    // TODO: register routes

    await app.listen({ host: config.app.host, port: config.app.port });

    app.log.info(app.printRoutes({ commonPrefix: false }));
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

// export { app, runApp };

export class FastifyFramework implements IFramework {
  private _instance: FastifyInstance = fastify({
    logger: envToLogger[env] ?? true,
  });

  async register(module: AsyncAppModule): Promise<void> {
    await this._instance.register(async (app) => {
      await module.init();
      app.addHook('onClose', async () => {
        await module.destroy();
      });
    });
  }

  async routes(controller: IController): Promise<void> {
    await this._instance.register(
      async (app) => {
        const routes = controller.routes();
        routes.forEach((route) => {
          app.route({
            method: route.method,
            url: route.endpoint,
            handler(request, reply) {
              try {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const { status, data } = route.handler({
                  params: request.params,
                  query: request.query,
                  body: request.body,
                });

                return reply.status(status).send({
                  status: httpStatusToString(status),
                  data,
                });
              } catch (err) {
                if (err instanceof HttpError) {
                  return reply.status(err.status).send({
                    status: httpStatusToString(err.status),
                    error: {
                      message: err.message,
                    },
                  });
                }

                if (err instanceof Error) {
                  return reply.status(500).send({
                    status: httpStatusToString(500),
                    error: {
                      message: err.message,
                    },
                  });
                }

                throw err;
              }
            },
          });
        });
      },
      {
        prefix: controller.prefix,
      }
    );
  }

  async listen() {
    try {
      await this._instance.listen({
        host: config.app.host,
        port: config.app.port,
      });
      this._instance.log.info(
        this._instance.printRoutes({ commonPrefix: false })
      );
    } catch (err) {
      this._instance.log.error(err);
      process.exit(1);
    }
  }
}
