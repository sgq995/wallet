import { Type } from '@sinclair/typebox';
import { IController } from '../models/controller.model';
import { IRoute, TRouteHandler } from '../models/route.model';
import { HttpStatus } from '../utilities/http.utility';
import { Indexable, PartialAndIndexable } from '../utilities/schema.utility';
import { TransactionsAdapter } from './transactions.adapter';
import {
  RestTransactionSchema,
  TRestTransactionSchema,
} from './transactions.schema';
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
        },
      },
    ];
  }

  find: TRouteHandler<{
    Query: Partial<TRestTransactionSchema>;
    Reply: TRestTransactionSchema[];
  }> = async ({ query }) => {
    const transactions = await this._repository.find();
    const data: TRestTransactionSchema[] = transactions.map(
      this._adapter.modelToRest
    );
    return { status: HttpStatus.Ok, data };
  };

  add: TRouteHandler<{ Body: TRestTransactionSchema }> = async ({ body }) => {
    const transaction = await this._repository.add(
      this._adapter.restToModel(body)
    );
    const data: TRestTransactionSchema = this._adapter.modelToRest(transaction);
    return { status: HttpStatus.Created, data };
  };
}
