import { Account, Currency, PrismaClient } from '@prisma/client';
import {
  HttpInternalServerError,
  HttpNotFoundError,
} from '@wallet/utilities/http.utility';
import { TIndexable, TRecursivePartial } from '@wallet/utilities/model.utility';
import config from '../config';
import { IAppPagingModel } from '../models/paging.model';
import { IAppAccountModel, IAppCreateAccountModel } from './accounts.model';

export class AccountsRepository {
  constructor(private _prisma: PrismaClient) {}

  async find(
    id?: number,
    filter?: Partial<IAppAccountModel>,
    requestPaging?: IAppPagingModel
  ): Promise<{
    accounts: TIndexable<IAppAccountModel>[];
    paging: IAppPagingModel;
  }> {
    const result = await this._prisma.account.findMany({
      where: {
        id,
      },
      skip: requestPaging?.offset,
      take: requestPaging?.limit ?? config.app.accounts.readLimit,
      include: {
        currency: true,
      },
    });

    if (id && result.length === 0) {
      throw new HttpNotFoundError('account not found');
    }

    const accounts: TIndexable<IAppAccountModel>[] = result.map(
      this._toAppModel
    );

    const paging: IAppPagingModel = {
      offset: requestPaging?.offset ?? 0,
      limit: requestPaging?.limit ?? config.app.transactions.readLimit,
    };

    return { accounts, paging };
  }

  async add(
    account: IAppCreateAccountModel
  ): Promise<TIndexable<IAppAccountModel>> {
    try {
      const result = await this._prisma.account.create({
        data: {
          label: account.label,
          currencyId: account.currencyId,
          startingUnits: account.startingBalance?.units,
          startingCents: account.startingBalance?.cents,
          units: account.balance.units,
          cents: account.balance.cents,
        },
        include: {
          currency: true,
        },
      });

      return this._toAppModel(result);
    } catch {
      throw new HttpInternalServerError('something goes wrong');
    }
  }

  async update(id: number, account: TRecursivePartial<IAppCreateAccountModel>) {
    try {
      const result = await this._prisma.account.update({
        where: {
          id,
        },
        data: {
          label: account.label,
          currencyId: account.currencyId,
          startingUnits: account.startingBalance?.units,
          startingCents: account.startingBalance?.cents,
          units: account.balance?.units,
          cents: account.balance?.cents,
        },
        include: {
          currency: true,
        },
      });

      if (account.currencyId) {
        await this._prisma.transaction.updateMany({
          data: {
            currencyId: account.currencyId,
          },
          where: {
            accountId: id,
          },
        });
      }

      return this._toAppModel(result);
    } catch {
      throw new HttpInternalServerError('something goes wrong');
    }
  }

  async remove(id: number): Promise<TIndexable<IAppAccountModel>> {
    try {
      const result = await this._prisma.account.delete({
        where: {
          id,
        },
        include: {
          currency: true,
        },
      });

      return this._toAppModel(result);
    } catch {
      throw new HttpNotFoundError('account not found');
    }
  }

  private _toAppModel(
    this: void,
    entity: Account & {
      currency: Currency;
    }
  ): TIndexable<IAppAccountModel> {
    const currency: IAppAccountModel['currency'] = {
      id: entity.currency.id,
      symbol: entity.currency.symbol,
      separator: entity.currency.separator,
      decimal: entity.currency.decimal,
      precision: entity.currency.precision,
      code: entity.currency.code,
    };

    return {
      id: entity.id,
      label: entity.label,
      currency,
      startingBalance: {
        units: entity.startingUnits ?? 0,
        cents: entity.startingCents ?? 0,
      },
      balance: {
        units: entity.units,
        cents: entity.cents,
      },
    };
  }
}
