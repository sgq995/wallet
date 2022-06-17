import { createContext } from 'react';
import { TArrayOfEntryTypeModel } from 'schemas/entry-types/model';

export interface ISystemContext {
  entryTypes: TArrayOfEntryTypeModel;
}

export const defaultSystemContext: ISystemContext = {
  entryTypes: [],
};

export const SystemContext =
  createContext<ISystemContext>(defaultSystemContext);
