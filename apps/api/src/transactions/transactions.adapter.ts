import { Currency, Tag, Transaction } from '@prisma/client';
import { IAdapter } from '../models/adapter.model';
import { IAppTransactionModel } from './transactions.model';
import { TRestTransactionSchema } from './transactions.schema';

export class TransactionsAdapter
  implements
    IAdapter<Transaction, IAppTransactionModel, TRestTransactionSchema>
{
  modelToStore(entity: IAppTransactionModel): Transaction {
    throw new Error('Method not implemented.');
  }

  storeToModel(
    this: void,
    transaction: Transaction & {
      currency: Currency;
      tags: Tag[];
    }
  ): IAppTransactionModel {
    const type: IAppTransactionModel['type'] = <IAppTransactionModel['type']>(
      transaction.type
    );

    const cash: IAppTransactionModel['cash'] = <IAppTransactionModel['cash']>{
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

    const repeat: IAppTransactionModel['repeat'] =
      transaction.repeat !== null ? transaction.repeat : undefined;

    const period: IAppTransactionModel['period'] =
      transaction.periodicity !== null
        ? <IAppTransactionModel['period']>{
            periodicity: transaction.periodicity,
            when: transaction.on || transaction.at || undefined,
          }
        : undefined;

    const tags: IAppTransactionModel['tags'] = transaction.tags.map(
      (tag) => tag.label
    );

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

  modelToRest(
    this: void,
    transaction: IAppTransactionModel
  ): TRestTransactionSchema {
    const type: TRestTransactionSchema['type'] = transaction.type;

    const cash: TRestTransactionSchema['cash'] = {
      units: transaction.cash.units,
      cents: transaction.cash.cents,
      currency: {},
    };

    const period: TRestTransactionSchema['period'] = transaction.period;

    return {
      type,
      cash,
      date: transaction.date.toUTCString(),
      repeat: transaction.repeat,
      period,
      tags: transaction.tags,
    };
  }

  restToModel(entity: TRestTransactionSchema): IAppTransactionModel {
    throw new Error('Method not implemented.');
  }
}
