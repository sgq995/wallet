import { TAccountReadonlySchema, TAccountMutableSchema } from '@wallet/schemas';
import { TIndexable } from '@wallet/utilities/model.utility';
import { TPaginableSchema } from '@wallet/utilities/schema.utility';
import config from '../config';
import {
  IAccountReadonlyModel,
  IAccountMutableModel,
} from '../models/account.model';
import { IPaging } from '../models/paging.model';
import {
  restDelete,
  restGet,
  restPatch,
  restPost,
} from '../utilities/rest-api.utility';
import { ICreateable } from './creatable.service';
import { IDeletable } from './deletable.service';
import { HttpService } from './http.service';
import { IReadable } from './readable.service';

const ACCOUNTS_BASE_PATH = '/v2/accounts';

type TIndexableAccountModel = TIndexable<IAccountReadonlyModel>;
type TIndexableAccountSchema = TIndexable<TAccountReadonlySchema>;

export type TAccountParams = Pick<TIndexableAccountModel, 'id'>;

export type TAccountQuery = Partial<TIndexableAccountModel> & {
  paging: Partial<IPaging>;
};

export type TAccountBody = IAccountMutableModel;

export type TPartialAccountBody = Partial<TAccountBody>;

export type TAccountCreateResponse = TIndexableAccountModel;

export type TAccountReadResponse = {
  accounts: Array<TIndexableAccountModel>;
  paging: IPaging;
};

export type TAccountUpdateResponse = TIndexableAccountModel;

export type TAccountDeleteResponse = TIndexableAccountModel;

function appToRest(entity: IAccountReadonlyModel): TAccountReadonlySchema {
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

function mutableAppToRest(entity: IAccountMutableModel): TAccountMutableSchema {
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

function restToApp(entity: TAccountReadonlySchema): IAccountReadonlyModel {
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

function readonlyRestToApp(
  entity: TIndexableAccountSchema
): TIndexableAccountModel {
  return {
    ...restToApp(entity),
    id: entity.id,
  };
}

class AccountsServiceImpl
  extends HttpService
  implements
    ICreateable<TAccountBody, TAccountCreateResponse>,
    IReadable<TAccountQuery, TAccountReadResponse>,
    IDeletable<TAccountParams, TAccountDeleteResponse>
{
  constructor(private _apiBaseUrl: string, signal?: AbortSignal) {
    super(signal);
  }

  async add(entity: TAccountBody): Promise<TAccountCreateResponse> {
    const body = await restPost<TIndexableAccountSchema>({
      baseUrl: this._apiBaseUrl,
      endpoint: ACCOUNTS_BASE_PATH,
      body: mutableAppToRest(entity),
      signal: this.signal,
    });

    return readonlyRestToApp(body.data);
  }

  async find(query?: TAccountQuery): Promise<TAccountReadResponse> {
    const body = await restGet<
      TIndexableAccountSchema[],
      TPaginableSchema['paging']
    >({
      baseUrl: this._apiBaseUrl,
      endpoint: ACCOUNTS_BASE_PATH,
      query,
      signal: this.signal,
    });

    return {
      accounts: body.data.map(readonlyRestToApp),
      paging: body.paging,
    };
  }

  async update(
    params: TAccountParams,
    entity: TPartialAccountBody
  ): Promise<TAccountUpdateResponse> {
    const body = await restPatch<TAccountUpdateResponse>({
      baseUrl: this._apiBaseUrl,
      endpoint: `${ACCOUNTS_BASE_PATH}/${params.id}`,
      body: entity,
      signal: this.signal,
    });

    return body.data;
  }

  async remove(params: TAccountParams): Promise<TAccountDeleteResponse> {
    const body = await restDelete<TAccountDeleteResponse>({
      baseUrl: this._apiBaseUrl,
      endpoint: `${ACCOUNTS_BASE_PATH}/${params.id}`,
      signal: this.signal,
    });

    return body.data;
  }
}

export const AccountsService = new AccountsServiceImpl(config.app.apiBaseUrl);
