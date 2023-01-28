import { TRestTransactionSchema } from '@wallet/schemas';
import { TIndexable } from '@wallet/utilities/model.utility';
import { TPaginableSchema } from '@wallet/utilities/schema.utility';
import config from '../config';
import { IPaging } from '../models/paging.model';
import { ITransaction } from '../models/transaction.model';
import { restDelete, restGet } from '../utilities/rest-api.utility';
import { IDeletable } from './deletable.service';
import { IReadable } from './readable.service';

const TRANSACTIONS_BASE_PATH = '/v2/transactions';

type TIndexableTransaction = TIndexable<ITransaction>;

export type TTransactionParams = Pick<TIndexableTransaction, 'id'>;
export type TTransactionQuery = Partial<TIndexableTransaction> & {
  paging: Partial<IPaging>;
};
export type TTransactionReadResponse = {
  transactions: Array<TIndexableTransaction>;
  paging: IPaging;
};
export type TTransactionDeleteResponse = TIndexableTransaction;

function restToApp(entity: TRestTransactionSchema): ITransaction {
  return {
    type: entity.type,
    cash: {
      units: entity.cash.units,
      cents: entity.cash.cents,
      currency: {
        symbol: '$',
        separator: ',',
        decimal: '.',
        precision: 2,
        code: 'USD',
      },
    },
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
  entity: TIndexable<TRestTransactionSchema>
): TIndexableTransaction {
  return {
    ...restToApp(entity),
    id: entity.id,
  };
}

class TransactionsServiceImpl
  implements
    IReadable<TTransactionQuery, TTransactionReadResponse>,
    IDeletable<TTransactionParams, TTransactionDeleteResponse>
{
  async find(query?: TTransactionQuery): Promise<TTransactionReadResponse> {
    const body = await restGet<
      TIndexable<TRestTransactionSchema>[],
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
