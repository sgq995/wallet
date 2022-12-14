import { Currency, Tag, Transaction } from '@prisma/client';
import { IAdapter } from '../models/adapter.model';
import { ITransaction, TTransactionModel } from './transactions.model';

export class TransactionsAdapter
  implements IAdapter<Transaction, ITransaction, TTransactionModel>
{
  modelToStore(entity: ITransaction): Transaction {
    throw new Error('Method not implemented.');
  }

  storeToModel(
    this: void,
    transaction: Transaction & {
      currency: Currency;
      tags: Tag[];
    }
  ): ITransaction {
    const type: ITransaction['type'] = <ITransaction['type']>transaction.type;

    const cash: ITransaction['cash'] = <ITransaction['cash']>{
      units: transaction.units,
      cents: transaction.cents,
      currency: {
        code: transaction.currency.code,
        decimal: transaction.currency.decimal,
        precision: transaction.currency.precision,
        separator: transaction.currency.separator,
        symbol: transaction.currency.symbol,
      },
    };

    const repeat: ITransaction['repeat'] =
      transaction.repeat !== null ? transaction.repeat : undefined;

    const period: ITransaction['period'] =
      transaction.periodicity !== null
        ? <ITransaction['period']>{
            periodicity: transaction.periodicity,
            when: transaction.on || transaction.at || undefined,
          }
        : undefined;

    const tags: ITransaction['tags'] = transaction.tags.map((tag) => tag.label);

    return {
      id: transaction.id,
      type,
      cash,
      date: transaction.date,
      repeat,
      period,
      tags,
    };
  }

  modelToRest(this: void, transaction: ITransaction): TTransactionModel {
    const type: TTransactionModel['type'] = transaction.type;

    const cash: TTransactionModel['cash'] = {
      units: transaction.cash.units,
      cents: transaction.cash.cents,
      currency: {},
    };

    const period: TTransactionModel['period'] = transaction.period;

    return {
      type,
      cash,
      date: transaction.date.toUTCString(),
      repeat: transaction.repeat,
      period,
      tags: transaction.tags,
    };
  }

  restToModel(entity: TTransactionModel): ITransaction {
    throw new Error('Method not implemented.');
  }
}
