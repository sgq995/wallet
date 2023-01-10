import config from '../config';
import { ITransaction } from '../models/transaction.model';
import { restGet, restPost } from '../utilities/rest-api.utility';
import { ICreateable } from './creatable.service';
import { IReadable } from './readable.service';

const TRANSACTIONS_BASE_PATH = '/v2/transactions';

class TransactionsServiceImpl
  implements
    ICreateable<ITransaction, ITransaction>,
    IReadable<Partial<ITransaction>, ITransaction>
{
  add(entity: ITransaction): Promise<ITransaction> {
    return restPost({
      baseUrl: config.app.apiBaseUrl,
      endpoint: TRANSACTIONS_BASE_PATH,
      body: entity,
    });
  }

  find<Query = Partial<ITransaction>, Result = ITransaction>(
    query?: Query
  ): Promise<Result> {
    return restGet({
      baseUrl: config.app.apiBaseUrl,
      endpoint: TRANSACTIONS_BASE_PATH,
      query,
    });
  }
}

export const TransactionsService = new TransactionsServiceImpl();
