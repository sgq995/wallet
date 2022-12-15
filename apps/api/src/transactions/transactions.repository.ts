import { Currency, PrismaClient, Tag, Transaction } from '@prisma/client';
import { IAppCurrencyModel } from '../models';
import { HttpInternalServerError } from '../utilities/http.utility';
import { TIndexable } from '../utilities/model.utility';
import { IAppTransactionModel } from './transactions.model';

export class TransactionsRepository {
  constructor(private _prisma: PrismaClient) {}

  async find(): Promise<TIndexable<IAppTransactionModel>[]> {
    const result = await this._prisma.transaction.findMany({
      where: {},
      include: {
        currency: true,
        tags: true,
      },
    });

    const transactions: TIndexable<IAppTransactionModel>[] = result.map(
      this._toAppModel
    );

    return transactions;
  }

  async add(
    transaction: IAppTransactionModel
  ): Promise<TIndexable<IAppTransactionModel>> {
    let result: Transaction & {
      currency: Currency;
      tags: Tag[];
    };

    if (transaction.cash.currency) {
      result = await this._createWithCurrency(
        transaction,
        transaction.cash.currency
      );
    } else if (transaction.cash.currencyId) {
      result = await this._createWithCurrencyId(
        transaction,
        transaction.cash.currencyId
      );
    } else {
      throw new HttpInternalServerError(
        'transaction should have "currency" or "currencyId"'
      );
    }

    return this._toAppModel(result);
  }

  private _toAppModel(
    this: void,
    entity: Transaction & {
      currency: Currency;
      tags: Tag[];
    }
  ): TIndexable<IAppTransactionModel> {
    const type: IAppTransactionModel['type'] = <IAppTransactionModel['type']>(
      entity.type
    );

    const cash: IAppTransactionModel['cash'] = <IAppTransactionModel['cash']>{
      units: entity.units,
      cents: entity.cents,
      currency: {
        id: entity.currency.id,
        code: entity.currency.code,
        decimal: entity.currency.decimal,
        precision: entity.currency.precision,
        separator: entity.currency.separator,
        symbol: entity.currency.symbol,
      },
    };

    const repeat: IAppTransactionModel['repeat'] =
      entity.repeat !== null ? entity.repeat : undefined;

    const period: IAppTransactionModel['period'] =
      entity.periodicity !== null
        ? <IAppTransactionModel['period']>{
            periodicity: entity.periodicity,
            when: entity.on || entity.at || undefined,
          }
        : undefined;

    const tags: IAppTransactionModel['tags'] = entity.tags.map(
      (tag) => tag.label
    );

    return {
      id: entity.id,
      type,
      cash,
      date: entity.date,
      repeat,
      period,
      tags,
    };
  }

  private _createWithCurrency(
    transaction: IAppTransactionModel,
    currency: TIndexable<IAppCurrencyModel>
  ) {
    return this._prisma.transaction.create({
      data: {
        type: transaction.type,
        units: transaction.cash.units,
        cents: transaction.cash.cents,
        currency: {
          connect: {
            id: currency.id,
            code: currency.code,
          },
        },
        date: transaction.date,
        repeat: transaction.repeat,
        periodicity: transaction.period?.periodicity,
        ...(typeof transaction.period?.when === 'number'
          ? { on: transaction.period?.when }
          : { at: transaction.period?.when }),
        tags: {
          connectOrCreate: transaction.tags.map((tag) => ({
            create: {
              label: tag,
            },
            where: {
              label: tag,
            },
          })),
        },
      },
      include: {
        currency: true,
        tags: true,
      },
    });
  }

  private _createWithCurrencyId(
    transaction: IAppTransactionModel,
    currencyId: number
  ) {
    return this._prisma.transaction.create({
      data: {
        type: transaction.type,
        units: transaction.cash.units,
        cents: transaction.cash.cents,
        currencyId: currencyId,
        date: transaction.date,
        repeat: transaction.repeat,
        periodicity: transaction.period?.periodicity,
        ...(typeof transaction.period?.when === 'number'
          ? { on: transaction.period?.when }
          : { at: transaction.period?.when }),
        tags: {
          connectOrCreate: transaction.tags.map((tag) => ({
            create: {
              label: tag,
            },
            where: {
              label: tag,
            },
          })),
        },
      },
      include: {
        currency: true,
        tags: true,
      },
    });
  }
}
