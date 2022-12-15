import { IAdapter } from '../models/adapter.model';
import { HttpInternalServerError } from '../utilities/http.utility';
import { TIndexable } from '../utilities/model.utility';
import { IAppTransactionModel } from './transactions.model';
import { TRestTransactionSchema } from './transactions.schema';

export class TransactionsAdapter
  implements IAdapter<IAppTransactionModel, TRestTransactionSchema>
{
  modelToRest(
    this: void,
    entity: TIndexable<IAppTransactionModel>
  ): TIndexable<TRestTransactionSchema> {
    const type: TRestTransactionSchema['type'] = entity.type;

    let cash: TRestTransactionSchema['cash'];
    if (entity.cash.currency) {
      cash = {
        units: entity.cash.units,
        cents: entity.cash.cents,
        currency: {
          id: entity.cash.currency.id,
          precision: entity.cash.currency.precision,
          symbol: entity.cash.currency.symbol,
          code: entity.cash.currency.code,
          decimal: entity.cash.currency.decimal,
          separator: entity.cash.currency.separator,
        },
      };
    } else if (entity.cash.currencyId) {
      cash = {
        units: entity.cash.units,
        cents: entity.cash.cents,
        currencyId: entity.cash.currencyId,
      };
    } else {
      throw new HttpInternalServerError(
        'transaction should have "currency" or "currencyId"'
      );
    }

    const period: TRestTransactionSchema['period'] = entity.period
      ? {
          periodicity: entity.period.periodicity,
          when: entity.period.when,
        }
      : undefined;

    return {
      id: entity.id,
      type,
      cash,
      date: entity.date.toUTCString(),
      repeat: entity.repeat,
      period,
      tags: entity.tags,
    };
  }

  restToModel(
    this: void,
    entity: TRestTransactionSchema
  ): IAppTransactionModel {
    const type: IAppTransactionModel['type'] = entity.type;

    const cash: IAppTransactionModel['cash'] = {
      units: entity.cash.units,
      cents: entity.cash.cents,
      currency:
        'currency' in entity.cash
          ? {
              id: entity.cash.currency.id,
              precision: entity.cash.currency.precision,
              symbol: entity.cash.currency.symbol,
              code: entity.cash.currency.code,
              decimal: entity.cash.currency.decimal,
              separator: entity.cash.currency.separator,
            }
          : undefined,
      currencyId:
        'currencyId' in entity.cash ? entity.cash.currencyId : undefined,
    };

    const period: IAppTransactionModel['period'] = entity.period
      ? {
          periodicity: entity.period.periodicity,
          when: entity.period.when,
        }
      : undefined;

    return {
      type,
      cash,
      date: new Date(entity.date),
      repeat: entity.repeat,
      period,
      tags: entity.tags,
    };
  }
}
