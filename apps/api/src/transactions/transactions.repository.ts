import { PrismaClient } from '@prisma/client';
import { TransactionsAdapter } from './transactions.adapter';
import { ITransaction } from './transactions.model';

export class TransactionsRepository {
  constructor(
    private _prisma: PrismaClient,
    private _adapter: TransactionsAdapter
  ) {}

  async find(): Promise<ITransaction[]> {
    const result = await this._prisma.transaction.findMany({
      where: {},
      include: {
        currency: true,
        tags: true,
      },
    });

    const transactions: ITransaction[] = result.map(this._adapter.storeToModel);

    return transactions;
  }

  async add(transaction: ITransaction): Promise<ITransaction> {
    const result = await this._prisma.transaction.create({
      data: {
        type: transaction.type,
        units: transaction.cash.units,
        cents: transaction.cash.cents,
        currencyId: 1,
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

    return this._adapter.storeToModel(result);
  }
}
