import { Static, Type } from '@sinclair/typebox';
import { IController } from '../models/controller.model';
import { IRoute, TRouteHandler } from '../models/route.model';
import { HttpStatus } from '../utilities/http.utility';
import {
  Indexable,
  PartialAndIndexable,
  RecursivePartial,
  TWithId,
  WithId,
} from '../utilities/schema.utility';
import { TransactionsAdapter } from './transactions.adapter';
import {
  RestTransactionSchema,
  TRestTransactionSchema,
} from './transactions.schema';
import { TransactionsRepository } from './transactions.repository';
import { TIndexable } from '../utilities/model.utility';
import { IAppTransactionModel } from './transactions.model';

export class TransactionsController implements IController {
  prefix?: string | undefined = '/v2/transactions';

  constructor(
    private _repository: TransactionsRepository,
    private _adapter: TransactionsAdapter
  ) {}

  routes(): IRoute[] {
    return <IRoute[]>[
      {
        method: 'GET',
        endpoint: '/',
        handler: this.find,
        schema: {
          query: PartialAndIndexable(RestTransactionSchema),
          reply: {
            [HttpStatus.Ok]: Type.Array(Indexable(RestTransactionSchema)),
          },
        },
      },
      {
        method: 'POST',
        endpoint: '/',
        handler: this.add,
        schema: {
          body: RestTransactionSchema,
          reply: {
            [HttpStatus.Created]: Indexable(RestTransactionSchema),
          },
        },
      },
      {
        method: 'GET',
        endpoint: '/:id',
        handler: this.find,
        schema: {
          params: Type.Partial(WithId),
          reply: {
            [HttpStatus.Ok]: Indexable(RestTransactionSchema),
          },
        },
      },
      {
        method: 'PATCH',
        endpoint: '/:id',
        handler: this.update,
        schema: {
          params: WithId,
          body: RecursivePartial(RestTransactionSchema),
          reply: {
            [HttpStatus.Ok]: Indexable(RestTransactionSchema),
          },
        },
      },
      {
        method: 'DELETE',
        endpoint: '/:id',
        handler: this.remove,
        schema: {
          params: WithId,
          reply: {
            [HttpStatus.Ok]: Indexable(RestTransactionSchema),
          },
        },
      },
    ];
  }

  find: TRouteHandler<{
    Params: TWithId;
    Query: Partial<TRestTransactionSchema>;
    Reply: TRestTransactionSchema | TRestTransactionSchema[];
  }> = async ({ params, query }) => {
    const transactions = await this._repository.find(
      params?.id,
      query ? this._adapter.restToModel(query) : undefined
    );
    const data: TRestTransactionSchema[] = transactions.map(
      (value: TIndexable<IAppTransactionModel>) =>
        this._adapter.modelToRest(value)
    );

    if (params?.id) {
      return { status: HttpStatus.Ok, data: data[0] };
    }

    return { status: HttpStatus.Ok, data };
  };

  add: TRouteHandler<{ Body: TRestTransactionSchema }> = async ({ body }) => {
    const transaction = await this._repository.add(
      this._adapter.restToModel(body)
    );
    const data: TRestTransactionSchema = this._adapter.modelToRest(transaction);
    return { status: HttpStatus.Created, data };
  };

  update: TRouteHandler<{
    Params: TWithId;
    Body: Partial<TRestTransactionSchema>;
  }> = async ({ params, body }) => {
    const transaction = await this._repository.update(
      params.id,
      this._adapter.restToModel(body)
    );
    const data: TIndexable<TRestTransactionSchema> =
      this._adapter.modelToRest(transaction);
    return { status: HttpStatus.Ok, data };
  };

  remove: TRouteHandler<{ Params: TWithId }> = async ({ params }) => {
    const transaction = await this._repository.remove(params.id);
    const data: TIndexable<TRestTransactionSchema> =
      this._adapter.modelToRest(transaction);
    return { status: HttpStatus.Ok, data };
  };
}
