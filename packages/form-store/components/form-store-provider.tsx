import React, { PropsWithChildren, useState } from 'react';
import { FormStoreContext } from '../context';
import { FormStore, TStore } from '../form-store';

export interface FormStoreProviderProps<T extends TStore> {
  defaultValues: T;
}

export function FormStoreProvider<T extends TStore>({
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
