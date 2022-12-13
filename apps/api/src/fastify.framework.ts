import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { TObject, TSchema } from '@sinclair/typebox';
import fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyServerOptions,
  RouteShorthandOptions,
} from 'fastify';
import config from './config';
import plugins from './legacy/plugins';
import services from './legacy/services/v1';
import { IController } from './models/controller.model';
import { IFramework } from './models/framework.model';
import { AsyncAppModule } from './models/module.model';
import { IRoute, IRouteSchema } from './models/route.model';
import {
  HttpError,
  HttpStatus,
  httpStatusToString,
} from './utilities/http.utility';
import { isErrorStatus } from './utilities/rest.utility';
import {
  toErrorSchema,
  toReplySchema,
  withPagingSchema,
} from './utilities/schema.utility';

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
          this._single(app, route);
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

  private _single(app: FastifyInstance, route: IRoute) {
    app.route({
      method: route.method,
      url: route.endpoint,
      schema: this._schemas(route.schema),
      handler: (request, reply) => {
        try {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const { status, data, paging } = route.handler({
            params: request.params,
            query: request.query,
            headers: request.headers,
            body: request.body,
          });

          if (isErrorStatus(status)) {
            return reply.status(status).send({
              status: httpStatusToString(status),
              error: data,
            });
          }

          return reply.status(status).send({
            status: httpStatusToString(status),
            data,
            paging,
          });
        } catch (err) {
          return this._httpError(reply, err);
        }
      },
    });
  }

  private _schemas(schema?: IRouteSchema): RouteShorthandOptions['schema'] {
    if (!schema) {
      return undefined;
    }

    let response: unknown = undefined;
    if (schema.reply) {
      const reply = schema.reply;
      const paging = schema.paging;
      response = Object.keys(schema.reply).reduce((schemas, key) => {
        const status = parseInt(key);
        const data: TSchema = reply[status];

        const schema = this._resolveReplySchema(status, data, !!paging);

        return {
          ...schemas,
          [status]: schema,
        };
      }, {});
    }

    return {
      params: schema.params,
      querystring: schema.query,
      headers: schema.headers,
      body: schema.body,
      response,
    };
  }

  private _resolveReplySchema(
    status: number,
    data: TSchema,
    isPaginated: boolean
  ) {
    if (isErrorStatus(status)) {
      return toErrorSchema(data);
    }

    const schema: TObject = toReplySchema(data);
    if (!isPaginated) {
      return schema;
    }

    return withPagingSchema(schema);
  }

  private _httpError(
    reply: FastifyReply,
    err: HttpError | Error | unknown
  ): FastifyReply | never {
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
}
