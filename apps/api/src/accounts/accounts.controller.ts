import { Type } from '@sinclair/typebox';
import {
  AccountReadonlySchema,
  AccountMutableSchema,
  TAccountMutableSchema,
} from '@wallet/schemas';
import { HttpStatus } from '@wallet/utilities/http.utility';
import {
  IndexableSchema,
  PaginableSchema,
  TIndexableSchema,
  TPaginableSchema,
} from '@wallet/utilities/schema.utility';
import { IController } from '../models/controller.model';
import { IRoute, TRouteHandler } from '../models/route.model';
import { AccountsAdapter } from './accounts.adapter';
import { AccountsRepository } from './accounts.repository';
import {
  TIndexableAccountReadonlyModel,
  TIndexableAccountReadonlySchema,
} from './accounts.types';

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
          query: Type.Partial(
            Type.Intersect([AccountMutableSchema, PaginableSchema])
          ),
          paging: PaginableSchema,
          reply: {
            [HttpStatus.Ok]: Type.Array(
              Type.Intersect([AccountReadonlySchema, IndexableSchema])
            ),
          },
        },
      },
      {
        method: 'POST',
        endpoint: '/',
        handler: this.add,
        schema: {
          body: AccountMutableSchema,
          reply: {
            [HttpStatus.Created]: Type.Intersect([
              AccountReadonlySchema,
              IndexableSchema,
            ]),
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
            [HttpStatus.Ok]: Type.Intersect([
              AccountReadonlySchema,
              IndexableSchema,
            ]),
          },
        },
      },
      {
        method: 'PATCH',
        endpoint: '/:id',
        handler: this.update,
        schema: {
          params: IndexableSchema,
          body: Type.Partial(AccountMutableSchema),
          reply: {
            [HttpStatus.Ok]: Type.Intersect([
              AccountReadonlySchema,
              IndexableSchema,
            ]),
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
            [HttpStatus.Ok]: Type.Intersect([
              AccountReadonlySchema,
              IndexableSchema,
            ]),
          },
        },
      },
    ];
  }

  find: TRouteHandler<{
    Params: TIndexableSchema | undefined;
    Query: Partial<TAccountMutableSchema & TPaginableSchema>;
    Reply: TIndexableAccountReadonlySchema | TIndexableAccountReadonlySchema[];
  }> = async ({ params, query }) => {
    const { accounts, paging } = await this._repository.find(
      params?.id,
      query ? this._adapter.mutableSchemaToModel(query) : undefined
    );
    const data: TIndexableAccountReadonlySchema[] = accounts.map(
      (value: TIndexableAccountReadonlyModel) =>
        this._adapter.readonlyModelToSchema(value)
    );

    if (params?.id) {
      return { status: HttpStatus.Ok, data: data[0] };
    }

    return { status: HttpStatus.Ok, data, paging };
  };

  add: TRouteHandler<{
    Body: TAccountMutableSchema;
    Reply: TIndexableAccountReadonlySchema;
  }> = async ({ body }) => {
    const account = await this._repository.add(
      this._adapter.mutableSchemaToModel(body)
    );
    const data: TIndexableAccountReadonlySchema =
      this._adapter.readonlyModelToSchema(account);
    return { status: HttpStatus.Created, data };
  };

  update: TRouteHandler<{
    Params: TIndexableSchema;
    Body: Partial<TAccountMutableSchema>;
    Reply: TIndexableAccountReadonlySchema;
  }> = async ({ params, body }) => {
    const account = await this._repository.update(
      params.id,
      this._adapter.mutableSchemaToModel(body)
    );
    const data: TIndexableAccountReadonlySchema =
      this._adapter.readonlyModelToSchema(account);
    return { status: HttpStatus.Ok, data };
  };

  remove: TRouteHandler<{
    Params: TIndexableSchema;
    Reply: TIndexableAccountReadonlySchema;
  }> = async ({ params }) => {
    const account = await this._repository.remove(params.id);
    const data: TIndexableAccountReadonlySchema =
      this._adapter.readonlyModelToSchema(account);
    return { status: HttpStatus.Ok, data };
  };
}
