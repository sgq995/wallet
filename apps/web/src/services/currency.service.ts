import { TRestCurrencySchema } from '@wallet/schemas';
import { TIndexable } from '@wallet/utilities/model.utility';
import config from '../config';
import { ICurrency } from '../models/currency.model';
import { restGet } from '../utilities/rest-api.utility';
import { IReadable } from './readable.service';

const CURRENCY_BASE = '/v1/currencies';

type TIndexableCurrency = TIndexable<ICurrency>;

export type TCurrencyQuery = Partial<TIndexableCurrency>;

export type TCurrencyResponse = Array<TIndexableCurrency>;

function restToApp(entity: TRestCurrencySchema): ICurrency {
  return {
    symbol: entity.symbol,
    separator: entity.separator,
    decimal: entity.decimal,
    precision: entity.precision,
    code: entity.code,
  };
}

function indexableRestToApp(
  entity: TIndexable<TRestCurrencySchema>
): TIndexable<ICurrency> {
  return {
    ...restToApp(entity),
    id: entity.id,
  };
}

export class CurrencyServiceImpl
  implements IReadable<TCurrencyQuery, TCurrencyResponse>
{
  async find(entity?: TCurrencyQuery): Promise<TCurrencyResponse> {
    const body = await restGet<TIndexable<TRestCurrencySchema>[]>({
      baseUrl: config.app.apiBaseUrl,
      endpoint: CURRENCY_BASE,
    });

    return body.data.map(indexableRestToApp);
  }
}

export const CurrencyService = new CurrencyServiceImpl();
