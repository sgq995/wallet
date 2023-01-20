import currency from 'currency.js';
import { ICash } from '../models/cash.model';

export function cashToString(cash: ICash): string {
  return currency(cash.units).format({
    symbol: cash.currency.symbol,
    separator: cash.currency.separator,
    decimal: cash.currency.decimal,
    precision: cash.currency.precision,
  });
}
