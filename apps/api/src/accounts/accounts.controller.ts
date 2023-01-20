import { Type } from '@sinclair/typebox';
import {
  RestAccountSchema,
  RestCreateAccountSchema,
  TRestAccountSchema,
  TRestCreateAccountSchema,
} from '@wallet/schemas';
import { HttpStatus } from '@wallet/utilities/http.utility';
import { TIndexable, TRecursivePartial } from '@wallet/utilities/model.utility';
import {
  IndexableSchema,
  PartialWithId,
  RecursivePartial,
  TIndexableSchema,
  WithId,
} from '@wallet/utilities/schema.utility';
import { IController } from '../models/controller.model';
import { IRoute, TRouteHandler } from '../models/route.model';
import { AccountsAdapter } from './accounts.adapter';
import { IAppAccountModel } from './accounts.model';
import { AccountsRepository } from './accounts.repository';

export class AccountsController implements IController {
  public prefix?: string | undefined = '/v2/accounts';

  constructor(
    private _repository: AccountsRepository,
    private _adapter: AccountsAdapter
  ) {}

  routes() {
    return <IRoute[]>[
      {
        method: 'GET',
        endpoint: '/',
        handler: this.find,
        schema: {
          query: PartialWithId(RestAccountSchema),
          reply: {
            [HttpStatus.Ok]: Type.Array(WithId(RestAccountSchema)),
          },
        },
      },
      {
        method: 'POST',
        endpoint: '/',
        handler: this.add,
        schema: {
          body: RestCreateAccountSchema,
          reply: {
            [HttpStatus.Created]: WithId(RestAccountSchema),
          },
        },
      },
      {
        method: 'GET',
        endpoint: '/:id',
        handler: this.find,
        schema: {
          params: IndexableSchema,
          reply: {
            [HttpStatus.Ok]: WithId(RestAccountSchema),
          },
        },
      },
      {
        method: 'PATCH',
        endpoint: '/:id',
        handler: this.update,
        schema: {
          params: IndexableSchema,
          body: RecursivePartial(RestCreateAccountSchema),
          reply: {
            [HttpStatus.Ok]: WithId(RestAccountSchema),
          },
        },
      },
      {
        method: 'DELETE',
        endpoint: '/:id',
        handler: this.remove,
        schema: {
          params: IndexableSchema,
          reply: {
            [HttpStatus.Ok]: WithId(RestAccountSchema),
          },
        },
      },
    ];
  }

  find: TRouteHandler<{
    Params: TIndexableSchema | undefined;
    Query: Partial<TRestAccountSchema>;
    Reply: TIndexable<TRestAccountSchema> | TIndexable<TRestAccountSchema>[];
  }> = async ({ params, query }) => {
    const accounts = await this._repository.find(
      params?.id,
      query ? this._adapter.restToModel(query) : undefined
    );
    const data: TIndexable<TRestAccountSchema>[] = accounts.map(
      (value: TIndexable<IAppAccountModel>) => this._adapter.modelToRest(value)
    );

    if (params?.id) {
      return { status: HttpStatus.Ok, data: data[0] };
    }

    return { status: HttpStatus.Ok, data };
  };

  add: TRouteHandler<{
    Body: TRestCreateAccountSchema;
    Reply: TIndexable<TRestAccountSchema>;
  }> = async ({ body }) => {
    const account = await this._repository.add(this._adapter.restToModel(body));
    const data: TIndexable<TRestAccountSchema> =
      this._adapter.modelToRest(account);
    return { status: HttpStatus.Created, data };
  };

  update: TRouteHandler<{
    Params: TIndexableSchema;
    Body: TRecursivePartial<TRestCreateAccountSchema>;
    Reply: TIndexable<TRestAccountSchema>;
  }> = async ({ params, body }) => {
    const account = await this._repository.update(
      params.id,
      this._adapter.restToModel(body)
    );
    const data: TIndexable<TRestAccountSchema> =
      this._adapter.modelToRest(account);
    return { status: HttpStatus.Ok, data };
  };

  remove: TRouteHandler<{
    Params: TIndexableSchema;
    Reply: TIndexable<TRestAccountSchema>;
  }> = async ({ params }) => {
    const account = await this._repository.remove(params.id);
    const data: TIndexable<TRestAccountSchema> =
      this._adapter.modelToRest(account);
    return { status: HttpStatus.Ok, data };
  };
}
