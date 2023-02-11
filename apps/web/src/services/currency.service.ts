import { TCurrencySchema } from '@wallet/schemas';
import { TIndexable } from '@wallet/utilities/model.utility';
import config from '../config';
import { ICurrency } from '../models/currency.model';
import { restGet } from '../utilities/rest-api.utility';
import { HttpService } from './http.service';
import { IReadable } from './readable.service';

const CURRENCY_BASE = '/v1/currencies';

type TIndexableCurrency = TIndexable<ICurrency>;

type TIndexableRestCurrency = TIndexable<TCurrencySchema>;

export type TCurrencyQuery = Partial<TIndexableCurrency>;

export type TCurrencyResponse = Array<TIndexableCurrency>;

function restToApp(entity: TCurrencySchema): ICurrency {
  return {
    symbol: entity.symbol,
    separator: entity.separator,
    decimal: entity.decimal,
    precision: entity.precision,
    code: entity.code,
  };
}

function indexableRestToApp(
  entity: TIndexableRestCurrency
): TIndexableCurrency {
  return {
    ...restToApp(entity),
    id: entity.id,
  };
}

export class CurrencyServiceImpl
  extends HttpService
  implements IReadable<TCurrencyQuery, TCurrencyResponse>
{
  constructor(private _apiBaseUrl: string, signal?: AbortSignal) {
    super(signal);
  }

  async find(entity?: TCurrencyQuery): Promise<TCurrencyResponse> {
    const body = await restGet<TIndexableRestCurrency[]>({
      baseUrl: this._apiBaseUrl,
      endpoint: CURRENCY_BASE,
    });

    return body.data.map(indexableRestToApp);
  }
}

export const CurrencyService = new CurrencyServiceImpl(config.app.apiBaseUrl);
