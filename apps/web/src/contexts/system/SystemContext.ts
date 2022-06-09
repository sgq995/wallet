import { createContext } from 'react';
import { TArrayOfEntryTypeModel } from 'schemas/entry-types/model';

export interface ISystemContext {
  entryTypes: TArrayOfEntryTypeModel;
}

export const defaultFirebaseContext: ISystemContext = {
  entryTypes: [],
};

export const SystemContext = createContext<ISystemContext>(
  defaultFirebaseContext
);
