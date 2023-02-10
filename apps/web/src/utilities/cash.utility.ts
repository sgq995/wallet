import currency from 'currency.js';
import { ICashBase } from '../models/cash.model';
import { ICurrency } from '../models/currency.model';

export function cashToString(cash: ICashBase, currencyData: ICurrency): string {
  return currency(cash.units).format({
    symbol: currencyData.symbol,
    separator: currencyData.separator,
    decimal: currencyData.decimal,
    precision: currencyData.precision,
  });
}
