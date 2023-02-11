import { Type } from '@sinclair/typebox';
import {
  AccountIdSchema,
  TAccountIdSchema,
  TransactionIdSchema,
  TransactionMutableSchema,
  TransactionReadonlySchema,
  TTransactionIdSchema,
  TTransactionMutableSchema,
  TTransactionReadonlySchema,
} from '@wallet/schemas';
import { HttpStatus } from '@wallet/utilities/http.utility';
import { TIndexable } from '@wallet/utilities/model.utility';
import {
  IndexableSchema,
  RecursivePartial,
} from '@wallet/utilities/schema.utility';
import { IController, IRoute, TRouteHandler } from '../models';
import { TransactionsController } from '../transactions';
import { AccountsTransactionsRepository } from './accounts-transactions.repository';

export class AccountsTransactionsController implements IController {
  public prefix?: string | undefined = '/v2/accounts';

  constructor(
    private _repository: AccountsTransactionsRepository,
    private _transactionsController: TransactionsController
  ) {}

  routes() {
    return <IRoute[]>[
      {
        method: 'GET',
        endpoint: '/:accountId/transactions',
        handler: this.find,
        schema: {
          params: AccountIdSchema,
          query: Type.Partial(
            Type.Intersect([TransactionMutableSchema, IndexableSchema])
          ),
          reply: {
            [HttpStatus.Ok]: Type.Array(
              Type.Intersect([TransactionReadonlySchema, IndexableSchema])
            ),
          },
        },
      },
      {
        method: 'POST',
        endpoint: '/:accountId/transactions',
        handler: this.add,
        schema: {
          params: AccountIdSchema,
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
        endpoint: '/:accountId/transactions/:transactionId',
        handler: this.find,
        schema: {
          params: Type.Intersect([AccountIdSchema, TransactionIdSchema]),
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
        endpoint: '/:accountId/transactions/:transactionId',
        handler: this.update,
        schema: {
          params: Type.Intersect([AccountIdSchema, TransactionIdSchema]),
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
        endpoint: '/:accountId/transactions/:transactionId',
        handler: this.remove,
        schema: {
          params: Type.Intersect([AccountIdSchema, TransactionIdSchema]),
          reply: {
            [HttpStatus.Ok]: Type.Intersect([
              TransactionReadonlySchema,
              IndexableSchema,
            ]),
          },
        },
      },
    ];
  }

  find: TRouteHandler<{
    Params: TAccountIdSchema | (TAccountIdSchema & TTransactionIdSchema);
    Query: Partial<TTransactionMutableSchema>;
    Reply:
      | TIndexable<TTransactionReadonlySchema>
      | TIndexable<TTransactionReadonlySchema>[];
  }> = async ({ params, query, ...request }) => {
    await this._repository.verifyAccountExists();
    return this._transactionsController.find({
      ...request,
      params:
        'transactionId' in params ? { id: params.transactionId } : undefined,
      query: { ...query, accountId: params.accountId },
    });
  };

  add: TRouteHandler<{
    Params: TAccountIdSchema;
    Body: TTransactionMutableSchema;
    Reply: TIndexable<TTransactionReadonlySchema>;
  }> = async ({ params, body, ...request }) => {
    await this._repository.verifyAccountExists();
    return this._transactionsController.add({
      ...request,
      params: {},
      body: { ...body, accountId: params.accountId },
    });
  };

  update: TRouteHandler<{
    Params: TAccountIdSchema & TTransactionIdSchema;
    Body: Partial<TTransactionMutableSchema>;
    Reply: TIndexable<TTransactionReadonlySchema>;
  }> = async ({ params, body, ...request }) => {
    await this._repository.verifyAccountExists();
    await this._repository.verifyTransactionOwnership(
      params.accountId,
      params.transactionId
    );
    return this._transactionsController.update({
      ...request,
      params: { id: params.transactionId },
      body: { ...body, accountId: params.accountId },
    });
  };

  remove: TRouteHandler<{
    Params: TAccountIdSchema & TTransactionIdSchema;
    Reply: TIndexable<TTransactionReadonlySchema>;
  }> = async ({ params, ...request }) => {
    await this._repository.verifyAccountExists();
    await this._repository.verifyTransactionOwnership(
      params.accountId,
      params.transactionId
    );
    return this._transactionsController.remove({
      ...request,
      params: { id: params.transactionId },
    });
  };
}
