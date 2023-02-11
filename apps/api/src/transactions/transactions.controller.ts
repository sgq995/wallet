import { Type } from '@sinclair/typebox';
import {
  TransactionReadonlySchema,
  TypedTransactionReadonlySchema,
  TTransactionMutableSchema,
  TransactionMutableSchema,
  TypedTransactionMutableSchema,
  TTypedTransactionMutableSchema,
} from '@wallet/schemas';
import { HttpStatus } from '@wallet/utilities/http.utility';
import {
  IndexableSchema,
  PaginableSchema,
  TIndexableSchema,
  TPaginableSchema,
} from '@wallet/utilities/schema.utility';
import { IController, IRoute, TRouteHandler } from '../models';
import { paginableRestToModel } from '../utilities/paginable.utility';
import { TransactionsAdapter } from './transactions.adapter';
import { TransactionsRepository } from './transactions.repository';
import {
  TIndexableTransactionReadonlyModel,
  TIndexableTransactionReadonlySchema,
} from './transactions.types';

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
          query: Type.Partial(
            Type.Intersect([TransactionMutableSchema, PaginableSchema])
          ),
          paging: PaginableSchema,
          reply: {
            [HttpStatus.Ok]: Type.Array(
              Type.Intersect([TransactionReadonlySchema, IndexableSchema])
            ),
          },
        },
      },
      {
        method: 'POST',
        endpoint: '/',
        handler: this.add,
        schema: {
          body: TransactionMutableSchema,
          reply: {
            [HttpStatus.Created]: Type.Intersect([
              TransactionReadonlySchema,
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
              TransactionReadonlySchema,
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
          body: Type.Partial(TransactionMutableSchema),
          reply: {
            [HttpStatus.Ok]: Type.Intersect([
              TransactionReadonlySchema,
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
              TransactionReadonlySchema,
              IndexableSchema,
            ]),
          },
        },
      },
      {
        method: 'GET',
        endpoint: '/income',
        handler: this.findIncome,
        schema: {
          query: Type.Partial(
            Type.Intersect([TypedTransactionMutableSchema, PaginableSchema])
          ),
          reply: {
            [HttpStatus.Ok]: Type.Array(
              Type.Intersect([TypedTransactionReadonlySchema, IndexableSchema])
            ),
          },
        },
      },
      {
        method: 'POST',
        endpoint: '/income',
        handler: this.addIncome,
        schema: {
          body: TypedTransactionMutableSchema,
          reply: {
            [HttpStatus.Created]: Type.Intersect([
              TypedTransactionReadonlySchema,
              IndexableSchema,
            ]),
          },
        },
      },
      {
        method: 'GET',
        endpoint: '/income/:id',
        handler: this.findIncome,
        schema: {
          params: IndexableSchema,
          reply: {
            [HttpStatus.Ok]: Type.Intersect([
              TypedTransactionReadonlySchema,
              IndexableSchema,
            ]),
          },
        },
      },
      {
        method: 'PATCH',
        endpoint: '/income/:id',
        handler: this.updateIncome,
        schema: {
          params: IndexableSchema,
          body: Type.Partial(TypedTransactionMutableSchema),
          reply: {
            [HttpStatus.Ok]: Type.Intersect([
              TypedTransactionReadonlySchema,
              IndexableSchema,
            ]),
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
            [HttpStatus.Ok]: Type.Intersect([
              TypedTransactionReadonlySchema,
              IndexableSchema,
            ]),
          },
        },
      },
      {
        method: 'GET',
        endpoint: '/expenses',
        handler: this.findExpenses,
        schema: {
          query: Type.Partial(
            Type.Intersect([TypedTransactionMutableSchema, PaginableSchema])
          ),
          reply: {
            [HttpStatus.Ok]: Type.Array(
              Type.Intersect([TypedTransactionReadonlySchema, IndexableSchema])
            ),
          },
        },
      },
      {
        method: 'POST',
        endpoint: '/expenses',
        handler: this.addExpenses,
        schema: {
          body: TypedTransactionMutableSchema,
          reply: {
            [HttpStatus.Created]: Type.Intersect([
              TypedTransactionReadonlySchema,
              IndexableSchema,
            ]),
          },
        },
      },
      {
        method: 'GET',
        endpoint: '/expenses/:id',
        handler: this.findExpenses,
        schema: {
          params: IndexableSchema,
          reply: {
            [HttpStatus.Ok]: Type.Intersect([
              TypedTransactionReadonlySchema,
              IndexableSchema,
            ]),
          },
        },
      },
      {
        method: 'PATCH',
        endpoint: '/expenses/:id',
        handler: this.updateExpenses,
        schema: {
          params: IndexableSchema,
          body: Type.Partial(TypedTransactionMutableSchema),
          reply: {
            [HttpStatus.Ok]: Type.Intersect([
              TypedTransactionReadonlySchema,
              IndexableSchema,
            ]),
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
            [HttpStatus.Ok]: Type.Intersect([
              TypedTransactionReadonlySchema,
              IndexableSchema,
            ]),
          },
        },
      },
    ];
  }

  find: TRouteHandler<{
    Params: TIndexableSchema | undefined;
    Query: Partial<TTransactionMutableSchema & TPaginableSchema>;
    Reply:
      | TIndexableTransactionReadonlySchema
      | TIndexableTransactionReadonlySchema[];
  }> = async ({ params, query }) => {
    const { transactions, paging } = await this._repository.find(
      params?.id,
      query ? this._adapter.mutableSchemaToModel(query) : undefined,
      query.paging ? paginableRestToModel(query.paging) : undefined
    );
    const data: TIndexableTransactionReadonlySchema[] = transactions.map(
      (value: TIndexableTransactionReadonlyModel) =>
        this._adapter.readonlyModelToSchema(value)
    );

    if (params?.id) {
      return {
        status: HttpStatus.Ok,
        data: data[0],
      };
    }

    return { status: HttpStatus.Ok, data, paging };
  };

  add: TRouteHandler<{
    Body: TTransactionMutableSchema;
    Reply: TIndexableTransactionReadonlySchema;
  }> = async ({ body }) => {
    const transaction = await this._repository.add(
      this._adapter.mutableSchemaToModel(body)
    );
    const data: TIndexableTransactionReadonlySchema =
      this._adapter.readonlyModelToSchema(transaction);
    return { status: HttpStatus.Created, data };
  };

  update: TRouteHandler<{
    Params: TIndexableSchema;
    Body: Partial<TTransactionMutableSchema>;
    Reply: TIndexableTransactionReadonlySchema;
  }> = async ({ params, body }) => {
    const transaction = await this._repository.update(
      params.id,
      this._adapter.mutableSchemaToModel(body)
    );
    const data: TIndexableTransactionReadonlySchema =
      this._adapter.readonlyModelToSchema(transaction);
    return { status: HttpStatus.Ok, data };
  };

  remove: TRouteHandler<{
    Params: TIndexableSchema;
    Reply: TIndexableTransactionReadonlySchema;
  }> = async ({ params }) => {
    const transaction = await this._repository.remove(params.id);
    const data: TIndexableTransactionReadonlySchema =
      this._adapter.readonlyModelToSchema(transaction);
    return { status: HttpStatus.Ok, data };
  };

  findIncome: TRouteHandler<{
    Params: TIndexableSchema | undefined;
    Query: Partial<TTypedTransactionMutableSchema>;
    Reply:
      | TIndexableTransactionReadonlySchema
      | TIndexableTransactionReadonlySchema[];
  }> = async (args) => {
    return this.find({
      ...args,
      query: { ...args.query, type: 'income' },
    });
  };

  addIncome: TRouteHandler<{
    Body: TTypedTransactionMutableSchema;
    Reply: TIndexableTransactionReadonlySchema;
  }> = async (args) => {
    return this.add({
      ...args,
      body: { ...args.body, type: 'income' },
    });
  };

  updateIncome: TRouteHandler<{
    Params: TIndexableSchema;
    Body: Partial<TTypedTransactionMutableSchema>;
    Reply: TIndexableTransactionReadonlySchema;
  }> = async (args) => {
    return this.update({
      ...args,
      body: { ...args.body, type: 'income' },
    });
  };

  removeIncome: TRouteHandler<{
    Params: TIndexableSchema;
    Reply: TIndexableTransactionReadonlySchema;
  }> = async (args) => {
    return this.remove({ ...args });
  };

  findExpenses: TRouteHandler<{
    Params: TIndexableSchema | undefined;
    Query: Partial<TTypedTransactionMutableSchema>;
    Reply:
      | TIndexableTransactionReadonlySchema
      | TIndexableTransactionReadonlySchema[];
  }> = async (args) => {
    return this.find({
      ...args,
      query: { ...args.query, type: 'expense' },
    });
  };

  addExpenses: TRouteHandler<{
    Body: TTypedTransactionMutableSchema;
    Reply: TIndexableTransactionReadonlySchema;
  }> = async (args) => {
    return this.add({
      ...args,
      body: { ...args.body, type: 'expense' },
    });
  };

  updateExpenses: TRouteHandler<{
    Params: TIndexableSchema;
    Body: Partial<TTypedTransactionMutableSchema>;
    Reply: TIndexableTransactionReadonlySchema;
  }> = async (args) => {
    return this.update({
      ...args,
      body: { ...args.body, type: 'expense' },
    });
  };

  removeExpenses: TRouteHandler<{
    Params: TIndexableSchema;
    Reply: TIndexableTransactionReadonlySchema;
  }> = async (args) => {
    return this.remove({ ...args });
  };
}
