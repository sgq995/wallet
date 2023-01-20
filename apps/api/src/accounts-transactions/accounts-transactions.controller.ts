import { Type } from '@sinclair/typebox';
import {
  RestTransactionSchema,
  TRestTransactionSchema,
  TWithAccountId,
  TWithTransactionId,
  WithAccountId,
  WithTransactionId,
} from '@wallet/schemas';
import { HttpStatus } from '@wallet/utilities/http.utility';
import { TIndexable } from '@wallet/utilities/model.utility';
import {
  PartialWithId,
  RecursivePartial,
  WithId,
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
          params: WithAccountId,
          query: PartialWithId(RestTransactionSchema),
          reply: {
            [HttpStatus.Ok]: Type.Array(WithId(RestTransactionSchema)),
          },
        },
      },
      {
        method: 'POST',
        endpoint: '/:accountId/transactions',
        handler: this.add,
        schema: {
          params: WithAccountId,
          body: RestTransactionSchema,
          reply: {
            [HttpStatus.Created]: WithId(RestTransactionSchema),
          },
        },
      },
      {
        method: 'GET',
        endpoint: '/:accountId/transactions/:transactionId',
        handler: this.find,
        schema: {
          params: Type.Intersect([WithAccountId, WithTransactionId]),
          reply: {
            [HttpStatus.Ok]: WithId(RestTransactionSchema),
          },
        },
      },
      {
        method: 'PATCH',
        endpoint: '/:accountId/transactions/:transactionId',
        handler: this.update,
        schema: {
          params: Type.Intersect([WithAccountId, WithTransactionId]),
          body: RecursivePartial(RestTransactionSchema),
          reply: {
            [HttpStatus.Ok]: WithId(RestTransactionSchema),
          },
        },
      },
      {
        method: 'DELETE',
        endpoint: '/:accountId/transactions/:transactionId',
        handler: this.remove,
        schema: {
          params: Type.Intersect([WithAccountId, WithTransactionId]),
          reply: {
            [HttpStatus.Ok]: WithId(RestTransactionSchema),
          },
        },
      },
    ];
  }

  find: TRouteHandler<{
    Params: TWithAccountId | (TWithAccountId & TWithTransactionId);
    Query: Partial<TRestTransactionSchema>;
    Reply:
      | TIndexable<TRestTransactionSchema>
      | TIndexable<TRestTransactionSchema>[];
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
    Params: TWithAccountId;
    Body: TRestTransactionSchema;
    Reply: TIndexable<TRestTransactionSchema>;
  }> = async ({ params, body, ...request }) => {
    await this._repository.verifyAccountExists();
    return this._transactionsController.add({
      ...request,
      params: {},
      body: { ...body, accountId: params.accountId },
    });
  };

  update: TRouteHandler<{
    Params: TWithAccountId & TWithTransactionId;
    Body: Partial<TRestTransactionSchema>;
    Reply: TIndexable<TRestTransactionSchema>;
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
    Params: TWithAccountId & TWithTransactionId;
    Reply: TIndexable<TRestTransactionSchema>;
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
