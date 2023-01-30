import { createContext } from 'react';
import { FormStore, TStore } from '../form-store';

export const FormStoreContext = createContext<FormStore<TStore>>(
  new FormStore({})
);
