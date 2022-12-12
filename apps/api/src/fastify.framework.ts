import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { TSchema, Type } from '@sinclair/typebox';
import fastify, { FastifyServerOptions } from 'fastify';
import config from './config';
import plugins from './legacy/plugins';
import services from './legacy/services/v1';
import { IController } from './models/controller.model';
import { IFramework } from './models/framework.model';
import { AsyncAppModule } from './models/module.model';
import {
  HttpError,
  HttpStatus,
  httpStatusToString,
} from './utilities/http.utility';

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
  private _instance = fastify({
    logger: envToLogger[env] ?? true,
  }).withTypeProvider<TypeBoxTypeProvider>();

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
            schema: {
              params: route.schema?.params,
              querystring: route.schema?.query,
              headers: route.schema?.headers,
              body: route.schema?.body,
              response: route.schema?.reply
                ? Object.keys(route.schema.reply).reduce((schemas, key) => {
                    const status = parseInt(key);
                    const reply: Record<number, TSchema> = route.schema
                      ?.reply as Record<number, TSchema>;
                    const schema: TSchema = reply?.[status];
                    return {
                      ...schemas,
                      [status]: Type.Object({
                        status: Type.String(),
                        ...(200 <= status && status < 300
                          ? {
                              data: schema,
                            }
                          : {
                              error: Type.Union([
                                schema,
                                Type.Object({
                                  message: Type.String(),
                                }),
                              ]),
                            }),
                      }),
                    };
                  }, {})
                : undefined,
            },
            handler(request, reply) {
              try {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const { status, data } = route.handler({
                  params: request.params,
                  query: request.query,
                  headers: request.headers,
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
                  return reply.status(HttpStatus.InternalServerError).send({
                    status: httpStatusToString(HttpStatus.InternalServerError),
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
