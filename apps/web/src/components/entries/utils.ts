import currency from 'currency.js';

import type { TEntryModel } from '@wallet/schemas/entries';

export function transactionToAmount(transaction?: TEntryModel['transaction']) {
  return currency(
    `${transaction?.units}${transaction?.currency.decimal}${transaction?.cents}`,
    transaction?.currency
  ).format();
}
