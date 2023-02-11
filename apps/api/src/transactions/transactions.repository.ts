import { Currency, PrismaClient, Tag, Transaction } from '@prisma/client';
import {
  HttpBadRequestError,
  HttpInternalServerError,
  HttpNotFoundError,
} from '@wallet/utilities/http.utility';
import { TIndex, TIndexable } from '@wallet/utilities/model.utility';
import config from '../config';
import { ICurrencyModel } from '../models';
import { IPagingModel } from '../models/paging.model';
import {
  ITransactionMutableModel,
  ITransactionReadonlyModel,
} from './transactions.model';
import {
  TIndexableTransactionReadonlyModel,
  TPartialTransactionMutableModel,
} from './transactions.types';

export class TransactionsRepository {
  constructor(private _prisma: PrismaClient) {}

  async find(
    id?: number,
    filter?: TPartialTransactionMutableModel,
    requestPaging?: IPagingModel
  ): Promise<{
    transactions: TIndexableTransactionReadonlyModel[];
    paging: IPagingModel;
  }> {
    const result = await this._prisma.transaction.findMany({
      where: {
        id,
      },
      orderBy: {
        date: 'desc',
      },
      skip: requestPaging?.offset,
      take: requestPaging?.limit ?? config.app.transactions.readLimit,
      include: {
        currency: true,
        tags: true,
        account: { select: { id: true } },
      },
    });

    if (id && result.length === 0) {
      throw new HttpNotFoundError('transaction not found');
    }

    const transactions: TIndexableTransactionReadonlyModel[] = result.map(
      this._toAppModel
    );

    const paging: IPagingModel = {
      offset: requestPaging?.offset ?? 0,
      limit: requestPaging?.limit ?? config.app.transactions.readLimit,
    };

    return { transactions, paging };
  }

  async add(
    transaction: ITransactionMutableModel
  ): Promise<TIndexableTransactionReadonlyModel> {
    const result: Transaction & {
      currency: Currency;
      tags: Tag[];
      account: { id: number } | null;
    } = await this._createWithCurrencyId(
      transaction,
      transaction.cash.currencyId
    );

    return this._toAppModel(result);
  }

  async update(
    id: number,
    transaction: Partial<ITransactionMutableModel>
  ): Promise<TIndexableTransactionReadonlyModel> {
    const accountId = transaction.accountId;
    const currencyId = transaction.cash?.currencyId;
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
            ...(currencyId
              ? {
                  connect: {
                    id: currencyId,
                  },
                }
              : {}),
          },
          date: transaction.date,
          description: transaction.description,
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

  async remove(id: TIndex): Promise<TIndexableTransactionReadonlyModel> {
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
  ): TIndexableTransactionReadonlyModel {
    const type: ITransactionReadonlyModel['type'] =
      entity.type as ITransactionReadonlyModel['type'];

    const cash: ITransactionReadonlyModel['cash'] = {
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
    } as ITransactionReadonlyModel['cash'];

    const description: ITransactionReadonlyModel['description'] =
      entity.description !== null ? entity.description : undefined;

    const repeat: ITransactionReadonlyModel['repeat'] =
      entity.repeat !== null ? entity.repeat : undefined;

    const period: ITransactionReadonlyModel['period'] =
      entity.periodicity !== null
        ? ({
            periodicity: entity.periodicity,
            when: entity.on || entity.at || undefined,
          } as ITransactionReadonlyModel['period'])
        : undefined;

    const tags: ITransactionReadonlyModel['tags'] = entity.tags.map(
      (tag) => tag.label
    );

    return {
      id: entity.id,
      type,
      cash,
      date: entity.date,
      description,
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
    transaction: ITransactionReadonlyModel,
    currency: TIndexable<ICurrencyModel>
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
          description: transaction.description,
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
    transaction: ITransactionMutableModel,
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
          description: transaction.description,
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
