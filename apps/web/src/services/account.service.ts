import { TRestAccountSchema, TRestCreateAccountSchema } from '@wallet/schemas';
import { TIndexable } from '@wallet/utilities/model.utility';
import { TPaginableSchema } from '@wallet/utilities/schema.utility';
import config from '../config';
import { IAccount, ICreatableAccount } from '../models/account.model';
import { IPaging } from '../models/paging.model';
import { restGet, restPost } from '../utilities/rest-api.utility';
import { ICreateable } from './creatable.service';
import { IReadable } from './readable.service';

const ACCOUNTS_BASE_PATH = '/v2/accounts';

type TIndexableAccount = TIndexable<IAccount>;
type TIndexableRestAccount = TIndexable<TRestAccountSchema>;

export type TAccountQuery = Partial<TIndexableAccount> & {
  paging: Partial<IPaging>;
};

export type TAccountBody = ICreatableAccount;

export type TAccountCreateResponse = TIndexableAccount;

export type TAccountReadResponse = {
  accounts: Array<TIndexableAccount>;
  paging: IPaging;
};

function appToRest(entity: IAccount): TRestAccountSchema {
  return {
    label: entity.label,
    balance: {
      cents: entity.balance.cents,
      units: entity.balance.units,
    },
    currency: {
      id: entity.currency.id,
      code: entity.currency.code,
      decimal: entity.currency.decimal,
      precision: entity.currency.precision,
      separator: entity.currency.separator,
      symbol: entity.currency.symbol,
    },
    startingBalance: entity.startingBalance
      ? {
          cents: entity.startingBalance.cents,
          units: entity.startingBalance.units,
        }
      : undefined,
  };
}

function modifableAppToRest(
  entity: ICreatableAccount
): TRestCreateAccountSchema {
  return {
    label: entity.label,
    balance: {
      cents: entity.balance.cents,
      units: entity.balance.units,
    },
    currencyId: entity.currencyId,
    startingBalance: entity.startingBalance
      ? {
          cents: entity.startingBalance.cents,
          units: entity.startingBalance.units,
        }
      : undefined,
  };
}

function restToApp(entity: TRestAccountSchema): IAccount {
  return {
    label: entity.label,
    currency: {
      id: entity.currency.id,
      code: entity.currency.code,
      decimal: entity.currency.decimal,
      precision: entity.currency.precision,
      separator: entity.currency.separator,
      symbol: entity.currency.symbol,
    },
    startingBalance: entity.startingBalance
      ? {
          units: entity.startingBalance.units,
          cents: entity.startingBalance.cents,
        }
      : undefined,
    balance: {
      units: entity.balance.units,
      cents: entity.balance.cents,
    },
  };
}

function indexableRestToApp(entity: TIndexableRestAccount): TIndexableAccount {
  return {
    ...restToApp(entity),
    id: entity.id,
  };
}

class AccountsServiceImpl
  implements
    ICreateable<TAccountBody, TAccountCreateResponse>,
    IReadable<TAccountQuery, TAccountReadResponse>
{
  constructor(private _apiBaseUrl: string) {}

  async add(entity: TAccountBody): Promise<TAccountCreateResponse> {
    const body = await restPost<TIndexableRestAccount>({
      baseUrl: this._apiBaseUrl,
      endpoint: ACCOUNTS_BASE_PATH,
      body: modifableAppToRest(entity),
    });

    return indexableRestToApp(body.data);
  }

  async find(query?: TAccountQuery): Promise<TAccountReadResponse> {
    const body = await restGet<
      TIndexableRestAccount[],
      TPaginableSchema['paging']
    >({
      baseUrl: this._apiBaseUrl,
      endpoint: ACCOUNTS_BASE_PATH,
      query,
    });

    return {
      accounts: body.data.map(indexableRestToApp),
      paging: body.paging,
    };
  }
}

export const AccountsService = new AccountsServiceImpl(config.app.apiBaseUrl);
