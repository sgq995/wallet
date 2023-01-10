import { Currency, PrismaClient, Tag, Transaction } from '@prisma/client';
import {
  HttpBadRequestError,
  HttpInternalServerError,
  HttpNotFoundError,
  TIndexable,
} from '@wallet/utilities';
import { IAppCurrencyModel } from '../models';
import { IAppTransactionModel } from './transactions.model';

export class TransactionsRepository {
  constructor(private _prisma: PrismaClient) {}

  async find(
    id?: number,
    filter?: Partial<IAppTransactionModel>
  ): Promise<TIndexable<IAppTransactionModel>[]> {
    const result = await this._prisma.transaction.findMany({
      where: {
        id,
      },
      include: {
        currency: true,
        tags: true,
        account: { select: { id: true } },
      },
    });

    if (id && result.length === 0) {
      throw new HttpNotFoundError('transaction not found');
    }

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
      account: { id: number } | null;
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

  async update(
    id: number,
    transaction: Partial<IAppTransactionModel>
  ): Promise<TIndexable<IAppTransactionModel>> {
    const accountId = transaction.accountId;
    const currencyId =
      transaction.cash?.currencyId || transaction.cash?.currency?.id;
    if (accountId && currencyId) {
      await this._verifyAccountAndCurrency(accountId, currencyId);
    } else if (accountId) {
      await this._verifyAccountAndTransaction(accountId, id);
    }

    try {
      const result = await this._prisma.transaction.update({
        data: {
          type: transaction.type,
          units: transaction.cash?.units,
          cents: transaction.cash?.cents,
          currency: {
            ...(transaction.cash?.currency?.id || transaction.cash?.currencyId
              ? {
                  connect: {
                    id:
                      transaction.cash?.currency?.id ||
                      transaction.cash?.currencyId,
                  },
                }
              : {}),
            ...(transaction.cash?.currency?.code
              ? {
                  connect: {
                    code: transaction.cash?.currency?.code,
                  },
                }
              : {}),
          },
          date: transaction.date,
          repeat: transaction.repeat,
          periodicity: transaction.period?.periodicity,
          ...(typeof transaction.period?.when === 'number'
            ? { on: transaction.period?.when }
            : { at: transaction.period?.when }),
          tags: transaction.tags
            ? {
                connectOrCreate: transaction.tags.map((tag) => ({
                  create: {
                    label: tag,
                  },
                  where: {
                    label: tag,
                  },
                })),
              }
            : undefined,
          account: {
            ...(transaction.accountId
              ? {
                  connect: {
                    id: transaction.accountId,
                  },
                }
              : {}),
          },
        },
        where: {
          id,
        },
        include: {
          currency: true,
          tags: true,
          account: { select: { id: true } },
        },
      });

      return this._toAppModel(result);
    } catch {
      throw new HttpNotFoundError('transaction or currency not found');
    }
  }

  async remove(id: number): Promise<TIndexable<IAppTransactionModel>> {
    try {
      const result = await this._prisma.transaction.delete({
        where: {
          id,
        },
        include: {
          currency: true,
          tags: true,
          account: { select: { id: true } },
        },
      });

      return this._toAppModel(result);
    } catch {
      throw new HttpNotFoundError('transaction not found');
    }
  }

  private _toAppModel(
    this: void,
    entity: Transaction & {
      currency: Currency;
      tags: Tag[];
      account: { id: number } | null;
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
      accountId: entity.account?.id,
    };
  }

  private async _verifyAccountAndCurrency(
    accountId: number | undefined,
    currencyId: number | undefined
  ) {
    if (!accountId) {
      return;
    }

    if (!currencyId) {
      return;
    }

    const account = await this._prisma.account.findUnique({
      where: { id: accountId },
    });
    if (!account) {
      throw new HttpNotFoundError('account not found');
    }

    if (account.currencyId !== currencyId) {
      throw new HttpBadRequestError(
        'account transaction should have the same currency as account'
      );
    }
  }

  private async _verifyAccountAndTransaction(
    accountId: number | undefined,
    transactionId: number | undefined
  ) {
    if (!accountId) {
      return;
    }

    if (!transactionId) {
      return;
    }

    const transaction = await this._prisma.transaction.findUnique({
      where: { id: transactionId },
    });
    if (!transaction) {
      throw new HttpNotFoundError('transaction not found');
    }

    await this._verifyAccountAndCurrency(accountId, transaction.currencyId);
  }

  private async _createWithCurrency(
    transaction: IAppTransactionModel,
    currency: TIndexable<IAppCurrencyModel>
  ) {
    await this._verifyAccountAndCurrency(transaction.accountId, currency.id);

    try {
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
          account: {
            connect: {
              id: transaction.accountId,
            },
          },
        },
        include: {
          currency: true,
          tags: true,
          account: { select: { id: true } },
        },
      });
    } catch {
      throw new HttpInternalServerError('something goes wrong');
    }
  }

  private async _createWithCurrencyId(
    transaction: IAppTransactionModel,
    currencyId: number
  ) {
    await this._verifyAccountAndCurrency(transaction.accountId, currencyId);

    try {
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
          accountId: transaction.accountId,
        },
        include: {
          currency: true,
          tags: true,
          account: { select: { id: true } },
        },
      });
    } catch {
      throw new HttpInternalServerError('something goes wrong');
    }
  }
}
