import { TRestTransactionSchema } from '@wallet/schemas';
import { dateTime } from '@wallet/utilities/date.utility';
import { TIndexable } from '@wallet/utilities/model.utility';
import { TPaginableSchema } from '@wallet/utilities/schema.utility';
import config from '../config';
import { IPaging } from '../models/paging.model';
import { ITransaction } from '../models/transaction.model';
import { restDelete, restGet, restPost } from '../utilities/rest-api.utility';
import { ICreateable } from './creatable.service';
import { IDeletable } from './deletable.service';
import { IReadable } from './readable.service';

const TRANSACTIONS_BASE_PATH = '/v2/transactions';

type TIndexableTransaction = TIndexable<ITransaction>;
type TIndexableRestTransaction = TIndexable<TRestTransactionSchema>;

export type TTransactionParams = Pick<TIndexableTransaction, 'id'>;

export type TTransactionQuery = Partial<TIndexableTransaction> & {
  paging: Partial<IPaging>;
};

export type TTransactionBody = ITransaction;

export type TTransactionCreateResponse = TIndexableTransaction;

export type TTransactionReadResponse = {
  transactions: Array<TIndexableTransaction>;
  paging: IPaging;
};

export type TTransactionDeleteResponse = TIndexableTransaction;

function restToApp(entity: TRestTransactionSchema): ITransaction {
  const cash: ITransaction['cash'] = {
    units: entity.cash.units,
    cents: entity.cash.cents,
    ...('currency' in entity.cash
      ? {
          currency: {
            code: entity.cash.currency.code,
            decimal: entity.cash.currency.decimal,
            id: entity.cash.currency.id,
            precision: entity.cash.currency.precision,
            separator: entity.cash.currency.separator,
            symbol: entity.cash.currency.symbol,
          },
        }
      : {
          currencyId: entity.cash.currencyId,
        }),
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

function indexableRestToApp(
  entity: TIndexableRestTransaction
): TIndexableTransaction {
  return {
    ...restToApp(entity),
    id: entity.id,
  };
}

function appToRest(entity: ITransaction): TRestTransactionSchema {
  const cash: TRestTransactionSchema['cash'] = {
    units: entity.cash.units,
    cents: entity.cash.cents,
    ...('currency' in entity.cash
      ? {
          currency: {
            code: entity.cash.currency.code,
            decimal: entity.cash.currency.decimal,
            id: entity.cash.currency.id,
            precision: entity.cash.currency.precision,
            separator: entity.cash.currency.separator,
            symbol: entity.cash.currency.symbol,
          },
        }
      : {
          currencyId: entity.cash.currencyId,
        }),
  };

  return {
    cash,
    date: dateTime(entity.date, true),
    tags: [...entity.tags],
    type: entity.type,
    accountId: entity.accountId,
    description: entity.description,
    period: entity.period ? { ...entity.period } : undefined,
    repeat: entity.repeat,
  };
}

function indexableAppToRest(
  entity: TIndexableTransaction
): TIndexableRestTransaction {
  return {
    ...appToRest(entity),
    id: entity.id,
  };
}

class TransactionsServiceImpl
  implements
    ICreateable<TTransactionBody, TTransactionCreateResponse>,
    IReadable<TTransactionQuery, TTransactionReadResponse>,
    IDeletable<TTransactionParams, TTransactionDeleteResponse>
{
  async add(entity: TTransactionBody): Promise<TTransactionCreateResponse> {
    const body = await restPost<TIndexableRestTransaction>({
      baseUrl: config.app.apiBaseUrl,
      endpoint: TRANSACTIONS_BASE_PATH,
      body: appToRest(entity),
    });

    return indexableRestToApp(body.data);
  }

  async find(query?: TTransactionQuery): Promise<TTransactionReadResponse> {
    const body = await restGet<
      TIndexableRestTransaction[],
      TPaginableSchema['paging']
    >({
      baseUrl: config.app.apiBaseUrl,
      endpoint: TRANSACTIONS_BASE_PATH,
      query,
    });

    return {
      transactions: body.data.map(indexableRestToApp),
      paging: body.paging,
    };
  }

  async remove(
    params: TTransactionParams
  ): Promise<TTransactionDeleteResponse> {
    const body = await restDelete<TTransactionDeleteResponse>({
      baseUrl: config.app.apiBaseUrl,
      endpoint: `${TRANSACTIONS_BASE_PATH}/${params.id}`,
    });

    return body.data;
  }
}

export const TransactionsService = new TransactionsServiceImpl();
