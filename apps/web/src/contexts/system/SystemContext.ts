import { createContext } from 'react';
import { TArrayOfCurrencyModel } from '@wallet/schemas/currencies/model';
import { TArrayOfEntryTypeModel } from '@wallet/schemas/entry-types/model';

export interface ISystemContext {
  entryTypes: TArrayOfEntryTypeModel;
  currencies: TArrayOfCurrencyModel;
}

export const defaultSystemContext: ISystemContext = {
  entryTypes: [],
  currencies: [],
};

export const SystemContext =
  createContext<ISystemContext>(defaultSystemContext);
