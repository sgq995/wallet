import { Type } from '@sinclair/typebox';
import {
  RestTransactionSchema,
  RestTypedTransactionSchema,
  TRestTransactionSchema,
  TRestTypedTransactionSchema,
} from '@wallet/schemas';
import { HttpStatus } from '@wallet/utilities/http.utility';
import { TIndexable } from '@wallet/utilities/model.utility';
import {
  IndexableSchema,
  PartialWithId,
  RecursivePartial,
  TIndexableSchema,
  WithId,
} from '@wallet/utilities/schema.utility';
import { IController, IRoute, TRouteHandler } from '../models';
import { TransactionsAdapter } from './transactions.adapter';
import { IAppTransactionModel } from './transactions.model';
import { TransactionsRepository } from './transactions.repository';

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
          query: PartialWithId(RestTransactionSchema),
          reply: {
            [HttpStatus.Ok]: Type.Array(WithId(RestTransactionSchema)),
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
            [HttpStatus.Created]: WithId(RestTransactionSchema),
          },
        },
      },
      {
        method: 'GET',
        endpoint: '/:id',
        handler: this.find,
        schema: {
          params: Type.Partial(IndexableSchema),
          reply: {
            [HttpStatus.Ok]: WithId(RestTransactionSchema),
          },
        },
      },
      {
        method: 'PATCH',
        endpoint: '/:id',
        handler: this.update,
        schema: {
          params: IndexableSchema,
          body: RecursivePartial(RestTransactionSchema),
          reply: {
            [HttpStatus.Ok]: WithId(RestTransactionSchema),
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
            [HttpStatus.Ok]: WithId(RestTransactionSchema),
          },
        },
      },
      {
        method: 'GET',
        endpoint: '/income',
        handler: this.findIncome,
        schema: {
          query: PartialWithId(RestTypedTransactionSchema),
          reply: {
            [HttpStatus.Ok]: Type.Array(WithId(RestTypedTransactionSchema)),
          },
        },
      },
      {
        method: 'POST',
        endpoint: '/income',
        handler: this.addIncome,
        schema: {
          body: RestTypedTransactionSchema,
          reply: {
            [HttpStatus.Created]: WithId(RestTypedTransactionSchema),
          },
        },
      },
      {
        method: 'GET',
        endpoint: '/income/:id',
        handler: this.findIncome,
        schema: {
          params: Type.Partial(IndexableSchema),
          reply: {
            [HttpStatus.Ok]: WithId(RestTypedTransactionSchema),
          },
        },
      },
      {
        method: 'PATCH',
        endpoint: '/income/:id',
        handler: this.updateIncome,
        schema: {
          params: IndexableSchema,
          body: RecursivePartial(RestTypedTransactionSchema),
          reply: {
            [HttpStatus.Ok]: WithId(RestTypedTransactionSchema),
          },
        },
      },
      {
        method: 'DELETE',
        endpoint: '/income/:id',
        handler: this.removeIncome,
        schema: {
          params: IndexableSchema,
          reply: {
            [HttpStatus.Ok]: WithId(RestTypedTransactionSchema),
          },
        },
      },
      {
        method: 'GET',
        endpoint: '/expenses',
        handler: this.findExpenses,
        schema: {
          query: PartialWithId(RestTypedTransactionSchema),
          reply: {
            [HttpStatus.Ok]: Type.Array(WithId(RestTypedTransactionSchema)),
          },
        },
      },
      {
        method: 'POST',
        endpoint: '/expenses',
        handler: this.addExpenses,
        schema: {
          body: RestTypedTransactionSchema,
          reply: {
            [HttpStatus.Created]: WithId(RestTypedTransactionSchema),
          },
        },
      },
      {
        method: 'GET',
        endpoint: '/expenses/:id',
        handler: this.findExpenses,
        schema: {
          params: Type.Partial(IndexableSchema),
          reply: {
            [HttpStatus.Ok]: WithId(RestTypedTransactionSchema),
          },
        },
      },
      {
        method: 'PATCH',
        endpoint: '/expenses/:id',
        handler: this.updateExpenses,
        schema: {
          params: IndexableSchema,
          body: RecursivePartial(RestTypedTransactionSchema),
          reply: {
            [HttpStatus.Ok]: WithId(RestTypedTransactionSchema),
          },
        },
      },
      {
        method: 'DELETE',
        endpoint: '/expenses/:id',
        handler: this.removeExpenses,
        schema: {
          params: IndexableSchema,
          reply: {
            [HttpStatus.Ok]: WithId(RestTypedTransactionSchema),
          },
        },
      },
    ];
  }

  find: TRouteHandler<{
    Params: TIndexableSchema | undefined;
    Query: Partial<TRestTransactionSchema>;
    Reply:
      | TIndexable<TRestTransactionSchema>
      | TIndexable<TRestTransactionSchema>[];
  }> = async ({ params, query }) => {
    const transactions = await this._repository.find(
      params?.id,
      query ? this._adapter.restToModel(query) : undefined
    );
    const data: TIndexable<TRestTransactionSchema>[] = transactions.map(
      (value: TIndexable<IAppTransactionModel>) =>
        this._adapter.modelToRest(value)
    );

    if (params?.id) {
      return { status: HttpStatus.Ok, data: data[0] };
    }

    return { status: HttpStatus.Ok, data };
  };

  add: TRouteHandler<{
    Body: TRestTransactionSchema;
    Reply: TIndexable<TRestTransactionSchema>;
  }> = async ({ body }) => {
    const transaction = await this._repository.add(
      this._adapter.restToModel(body)
    );
    const data: TIndexable<TRestTransactionSchema> =
      this._adapter.modelToRest(transaction);
    return { status: HttpStatus.Created, data };
  };

  update: TRouteHandler<{
    Params: TIndexableSchema;
    Body: Partial<TRestTransactionSchema>;
    Reply: TIndexable<TRestTransactionSchema>;
  }> = async ({ params, body }) => {
    const transaction = await this._repository.update(
      params.id,
      this._adapter.restToModel(body)
    );
    const data: TIndexable<TRestTransactionSchema> =
      this._adapter.modelToRest(transaction);
    return { status: HttpStatus.Ok, data };
  };

  remove: TRouteHandler<{
    Params: TIndexableSchema;
    Reply: TIndexable<TRestTransactionSchema>;
  }> = async ({ params }) => {
    const transaction = await this._repository.remove(params.id);
    const data: TIndexable<TRestTransactionSchema> =
      this._adapter.modelToRest(transaction);
    return { status: HttpStatus.Ok, data };
  };

  findIncome: TRouteHandler<{
    Params: TIndexableSchema | undefined;
    Query: Partial<TRestTypedTransactionSchema>;
    Reply:
      | TIndexable<TRestTransactionSchema>
      | TIndexable<TRestTransactionSchema>[];
  }> = async (args) => {
    return this.find({
      ...args,
      query: { ...args.query, type: 'income' },
    });
  };

  addIncome: TRouteHandler<{
    Body: TRestTypedTransactionSchema;
    Reply: TIndexable<TRestTransactionSchema>;
  }> = async (args) => {
    return this.add({
      ...args,
      body: { ...args.body, type: 'income' },
    });
  };

  updateIncome: TRouteHandler<{
    Params: TIndexableSchema;
    Body: Partial<TRestTypedTransactionSchema>;
    Reply: TIndexable<TRestTransactionSchema>;
  }> = async (args) => {
    return this.update({
      ...args,
      body: { ...args.body, type: 'income' },
    });
  };

  removeIncome: TRouteHandler<{
    Params: TIndexableSchema;
    Reply: TIndexable<TRestTransactionSchema>;
  }> = async (args) => {
    return this.remove({ ...args });
  };

  findExpenses: TRouteHandler<{
    Params: TIndexableSchema | undefined;
    Query: Partial<TRestTypedTransactionSchema>;
    Reply:
      | TIndexable<TRestTransactionSchema>
      | TIndexable<TRestTransactionSchema>[];
  }> = async (args) => {
    return this.find({
      ...args,
      query: { ...args.query, type: 'expense' },
    });
  };

  addExpenses: TRouteHandler<{
    Body: TRestTypedTransactionSchema;
    Reply: TIndexable<TRestTransactionSchema>;
  }> = async (args) => {
    return this.add({
      ...args,
      body: { ...args.body, type: 'expense' },
    });
  };

  updateExpenses: TRouteHandler<{
    Params: TIndexableSchema;
    Body: Partial<TRestTypedTransactionSchema>;
    Reply: TIndexable<TRestTransactionSchema>;
  }> = async (args) => {
    return this.update({
      ...args,
      body: { ...args.body, type: 'expense' },
    });
  };

  removeExpenses: TRouteHandler<{
    Params: TIndexableSchema;
    Reply: TIndexable<TRestTransactionSchema>;
  }> = async (args) => {
    return this.remove({ ...args });
  };
}
