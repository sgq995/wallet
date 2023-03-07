import {
  TTransactionMutableSchema,
  TTransactionReadonlySchema,
} from '@wallet/schemas';
import { dateTime } from '@wallet/utilities/date.utility';
import { TIndexable } from '@wallet/utilities/model.utility';
import { TPaginableSchema } from '@wallet/utilities/schema.utility';
import config from '../config';
import { IPaging } from '../models/paging.model';
import {
  ITransactionMutableModel,
  ITransactionReadonlyModel,
} from '../models/transaction.model';
import {
  restDelete,
  restGet,
  restPatch,
  restPost,
} from '../utilities/rest-api.utility';
import { ICreateable } from './creatable.service';
import { IDeletable } from './deletable.service';
import { IReadable } from './readable.service';
import { HttpService } from './http.service';
import { IUpdateable } from './updateable.service';
import { isUndefined } from 'lodash';

const TRANSACTIONS_BASE_PATH = '/v2/transactions';

type TIndexableTransactionModel = TIndexable<ITransactionReadonlyModel>;
type TIndexableTransactionSchema = TIndexable<TTransactionReadonlySchema>;

export type TTransactionParams = Pick<TIndexableTransactionModel, 'id'>;

export type TTransactionQuery = Partial<TIndexableTransactionModel> & {
  paging: Partial<IPaging>;
};

export type TTransactionBody = ITransactionMutableModel;

export type TPartialTransactionBody = Partial<TTransactionBody>;

export type TTransactionCreateResponse = TIndexableTransactionModel;

export type TTransactionReadResponse = {
  transactions: Array<TIndexableTransactionModel>;
  paging: IPaging;
};

export type TTransactionUpdateResponse = TIndexableTransactionModel;

export type TTransactionDeleteResponse = TIndexableTransactionModel;

function restToApp(
  entity: TTransactionReadonlySchema
): ITransactionReadonlyModel {
  if (!('currency' in entity.cash)) {
    throw new Error('Not implemented yet');
  }

  const cash: ITransactionReadonlyModel['cash'] = {
    units: entity.cash.units,
    cents: entity.cash.cents,
    currency: {
      code: entity.cash.currency.code,
      decimal: entity.cash.currency.decimal,
      id: entity.cash.currency.id,
      precision: entity.cash.currency.precision,
      separator: entity.cash.currency.separator,
      symbol: entity.cash.currency.symbol,
    },
  };

  return {
    type: entity.type,
    cash,
    date: new Date(entity.date),
    description: entity.description,
    repeat: entity.repeat,
    period: entity.period
      ? {
          periodicity: entity.period.periodicity,
          when: entity.period.when,
        }
      : undefined,
    tags: entity.tags.concat(),
    accountId: entity.accountId,
  };
}

function readonlyRestToModel(
  entity: TIndexableTransactionSchema
): TIndexableTransactionModel {
  return {
    ...restToApp(entity),
    id: entity.id,
  };
}

function mutableModelToSchema(
  entity: ITransactionMutableModel
): TTransactionMutableSchema;
function mutableModelToSchema(
  entity: Partial<ITransactionMutableModel>
): Partial<TTransactionMutableSchema>;
function mutableModelToSchema(
  entity: ITransactionMutableModel | Partial<ITransactionMutableModel>
): TTransactionMutableSchema | Partial<TTransactionMutableSchema> {
  const cash: TTransactionMutableSchema['cash'] | undefined = !isUndefined(
    entity.cash
  )
    ? {
        units: entity.cash.units,
        cents: entity.cash.cents,
        currencyId: entity.cash.currencyId,
      }
    : undefined;

  const date: TTransactionMutableSchema['date'] | undefined = !isUndefined(
    entity.date
  )
    ? dateTime(entity.date, true)
    : undefined;

  const tags: TTransactionMutableSchema['tags'] | undefined = !isUndefined(
    entity.tags
  )
    ? [...entity.tags]
    : undefined;

  return {
    cash,
    date,
    tags,
    type: entity.type,
    accountId: entity.accountId,
    description: entity.description,
    period: entity.period ? { ...entity.period } : undefined,
    repeat: entity.repeat,
  };
}

class TransactionsServiceImpl
  extends HttpService
  implements
    ICreateable<TTransactionBody, TTransactionCreateResponse>,
    IReadable<TTransactionQuery, TTransactionReadResponse>,
    IUpdateable<
      TTransactionParams,
      TPartialTransactionBody,
      TTransactionUpdateResponse
    >,
    IDeletable<TTransactionParams, TTransactionDeleteResponse>
{
  constructor(private _apiBaseUrl: string, signal?: AbortSignal) {
    super(signal);
  }

  async add(entity: TTransactionBody): Promise<TTransactionCreateResponse> {
    const body = await restPost<TIndexableTransactionSchema>({
      baseUrl: this._apiBaseUrl,
      endpoint: TRANSACTIONS_BASE_PATH,
      body: mutableModelToSchema(entity),
      signal: this.signal,
    });

    return readonlyRestToModel(body.data);
  }

  async find(query?: TTransactionQuery): Promise<TTransactionReadResponse> {
    const body = await restGet<
      TIndexableTransactionSchema[],
      TPaginableSchema['paging']
    >({
      baseUrl: this._apiBaseUrl,
      endpoint: TRANSACTIONS_BASE_PATH,
      query,
      signal: this.signal,
    });

    return {
      transactions: body.data.map(readonlyRestToModel),
      paging: body.paging,
    };
  }

  async update(
    params: TTransactionParams,
    entity: TPartialTransactionBody
  ): Promise<TTransactionUpdateResponse> {
    const body = await restPatch<TTransactionUpdateResponse>({
      baseUrl: this._apiBaseUrl,
      endpoint: `${TRANSACTIONS_BASE_PATH}/${params.id}`,
      body: mutableModelToSchema(entity),
      signal: this.signal,
    });

    return body.data;
  }

  async remove(
    params: TTransactionParams
  ): Promise<TTransactionDeleteResponse> {
    const body = await restDelete<TTransactionDeleteResponse>({
      baseUrl: this._apiBaseUrl,
      endpoint: `${TRANSACTIONS_BASE_PATH}/${params.id}`,
      signal: this.signal,
    });

    return body.data;
  }
}

export const TransactionsService = new TransactionsServiceImpl(
  config.app.apiBaseUrl
);
