import { Type } from '@sinclair/typebox';
import { IController } from '../models/controller.model';
import { IRoute, TRouteHandler } from '../models/route.model';
import { HttpStatus } from '../utilities/http.utility';
import { TIndexable, TRecursivePartial } from '../utilities/model.utility';
import {
  Indexable,
  PartialAndIndexable,
  RecursivePartial,
  TWithId,
  WithId,
} from '../utilities/schema.utility';
import { AccountsAdapter } from './accounts.adapter';
import { IAppAccountModel } from './accounts.model';
import { AccountsRepository } from './accounts.repository';
import {
  RestAccountSchema,
  RestCreateAccountSchema,
  TRestAccountSchema,
  TRestCreateAccountSchema,
} from './accounts.schema';

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
          query: PartialAndIndexable(RestAccountSchema),
          reply: {
            [HttpStatus.Ok]: Type.Array(Indexable(RestAccountSchema)),
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
            [HttpStatus.Ok]: Type.Array(Indexable(RestAccountSchema)),
          },
        },
      },
      {
        method: 'GET',
        endpoint: '/:id',
        handler: this.find,
        schema: {
          params: WithId,
          reply: {
            [HttpStatus.Ok]: Indexable(RestAccountSchema),
          },
        },
      },
      {
        method: 'PATCH',
        endpoint: '/:id',
        handler: this.update,
        schema: {
          params: WithId,
          body: RecursivePartial(RestCreateAccountSchema),
          reply: {
            [HttpStatus.Ok]: Indexable(RestAccountSchema),
          },
        },
      },
    ];
  }

  find: TRouteHandler<{
    Params: TWithId | undefined;
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
    Params: TWithId;
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
}
