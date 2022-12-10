import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import config from './config';
import plugins from './legacy/plugins';
import services from './legacy/services/v1';
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
      await this._instance.register(plugins);

      await this._instance.register(services);

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
