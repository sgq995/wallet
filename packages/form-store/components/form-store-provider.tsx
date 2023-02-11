import React, { PropsWithChildren, useState } from 'react';
import { FormStoreContext } from '../context';
import { FormStore, TStore, TStoreKey } from '../form-store';

export interface FormStoreProviderProps<T extends TStore<TStoreKey, string>> {
  defaultValues: T;
}

export function FormStoreProvider<T extends TStore<TStoreKey, string>>({
  defaultValues,
  children,
}: PropsWithChildren<FormStoreProviderProps<T>>) {
  const [formStore] = useState(() => new FormStore(defaultValues));

  return (
    <FormStoreContext.Provider value={formStore}>
      {children}
    </FormStoreContext.Provider>
  );
}
