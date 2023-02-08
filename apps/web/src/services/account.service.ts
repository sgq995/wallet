import { TRestAccountSchema } from '@wallet/schemas';
import { TIndexable } from '@wallet/utilities/model.utility';
import { TPaginableSchema } from '@wallet/utilities/schema.utility';
import config from '../config';
import { IAccount } from '../models/account.model';
import { IPaging } from '../models/paging.model';
import { restGet } from '../utilities/rest-api.utility';
import { IReadable } from './readable.service';

const ACCOUNTS_BASE_PATH = '/v2/accounts';

type TIndexableAccount = TIndexable<IAccount>;
type TIndexableRestAccount = TIndexable<TRestAccountSchema>;

export type TAccountQuery = Partial<TIndexableAccount> & {
  paging: Partial<IPaging>;
};

export type TAccountReadResponse = {
  accounts: Array<TIndexableAccount>;
  paging: IPaging;
};

function restToApp(entity: TRestAccountSchema): IAccount {
  const currency: IAccount['currency'] = {
    code: entity.currency.code,
    decimal: entity.currency.decimal,
    precision: entity.currency.precision,
    separator: entity.currency.separator,
    symbol: entity.currency.symbol,
  };

  const startingBalance: IAccount['startingBalance'] = entity.startingBalance
    ? {
        units: entity.startingBalance.units,
        cents: entity.startingBalance.cents,
      }
    : undefined;

  const balance: IAccount['balance'] = {
    units: entity.balance.units,
    cents: entity.balance.cents,
  };

  return {
    label: entity.label,
    currency,
    startingBalance,
    balance,
  };
}

function indexableRestToApp(entity: TIndexableRestAccount): TIndexableAccount {
  return {
    ...restToApp(entity),
    id: entity.id,
  };
}

class AccountsServiceImpl
  implements IReadable<TAccountQuery, TAccountReadResponse>
{
  constructor(private _apiBaseUrl: string) {}

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
