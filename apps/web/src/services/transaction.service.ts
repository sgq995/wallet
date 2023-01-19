import { TRestTransactionSchema } from '@wallet/schemas';
import { TIndexable } from '@wallet/utilities';
import config from '../config';
import { ITransaction } from '../models/transaction.model';
import { restGet, restPost } from '../utilities/rest-api.utility';
import { ICreateable } from './creatable.service';
import { IReadable } from './readable.service';

const TRANSACTIONS_BASE_PATH = '/v2/transactions';

export type TTransactionQuery = Partial<TIndexable<ITransaction>>;
export type TTransactionResponse = Array<TIndexable<ITransaction>>;

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
): TIndexable<ITransaction> {
  return {
    ...restToApp(entity),
    id: entity.id,
  };
}

class TransactionsServiceImpl
  implements IReadable<TTransactionQuery, TTransactionResponse>
{
  async find(query?: TTransactionQuery): Promise<TTransactionResponse> {
    const body = await restGet<TIndexable<TRestTransactionSchema>[]>({
      baseUrl: config.app.apiBaseUrl,
      endpoint: TRANSACTIONS_BASE_PATH,
      query,
    });

    return body.data.map(indexableRestToApp);
  }
}

export const TransactionsService = new TransactionsServiceImpl();
