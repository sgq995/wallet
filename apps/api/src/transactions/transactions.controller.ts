import { Type } from '@sinclair/typebox';
import { IController } from '../models/controller.model';
import { IRoute, TRouteHandler } from '../models/route.model';
import { HttpStatus } from '../utilities/http.utility';
import { TransactionsAdapter } from './transactions.adapter';
import {
  PartialTransactionModel,
  TPartialTransactionModel,
  TransactionModel,
  TTransactionModel,
} from './transactions.model';
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
          query: PartialTransactionModel,
          reply: {
            [HttpStatus.Ok]: Type.Array(TransactionModel),
          },
        },
      },
      {
        method: 'POST',
        endpoint: '/',
        handler: this.add,
        schema: {},
      },
    ];
  }

  find: TRouteHandler<{
    Query: TPartialTransactionModel;
    Reply: TTransactionModel[];
  }> = async ({ query }) => {
    const transactions = await this._repository.find();
    const data: TTransactionModel[] = transactions.map(
      this._adapter.modelToRest
    );
    return { status: HttpStatus.Ok, data };
  };

  add: TRouteHandler<{ Body: TTransactionModel }> = async ({ body }) => {
    const transaction = await this._repository.add(
      this._adapter.restToModel(body)
    );
    const data: TTransactionModel = this._adapter.modelToRest(transaction);
    return { status: HttpStatus.Created, data };
  };
}
