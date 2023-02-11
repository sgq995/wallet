import { Account, Currency, PrismaClient } from '@prisma/client';
import {
  HttpInternalServerError,
  HttpNotFoundError,
} from '@wallet/utilities/http.utility';
import config from '../config';
import { IPagingModel } from '../models/paging.model';
import { IAccountMutableModel } from './accounts.model';
import {
  TIndexableAccountReadonlyModel,
  TPartialAccountMutableModel,
} from './accounts.types';

export class AccountsRepository {
  constructor(private _prisma: PrismaClient) {}

  async find(
    id?: number,
    filter?: TPartialAccountMutableModel,
    requestPaging?: IPagingModel
  ): Promise<{
    accounts: TIndexableAccountReadonlyModel[];
    paging: IPagingModel;
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

    const accounts: TIndexableAccountReadonlyModel[] = result.map(
      this._toAppModel
    );

    const paging: IPagingModel = {
      offset: requestPaging?.offset ?? 0,
      limit: requestPaging?.limit ?? config.app.transactions.readLimit,
    };

    return { accounts, paging };
  }

  async add(
    account: IAccountMutableModel
  ): Promise<TIndexableAccountReadonlyModel> {
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

  async update(id: number, account: TPartialAccountMutableModel) {
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

  async remove(id: number): Promise<TIndexableAccountReadonlyModel> {
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
  ): TIndexableAccountReadonlyModel {
    const currency: TIndexableAccountReadonlyModel['currency'] = {
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
