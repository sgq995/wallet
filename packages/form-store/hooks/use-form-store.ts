import { useContext } from 'react';
import { FormStoreContext } from '../context';
import { FormStore, TStore, TStoreKey } from '../form-store';

export function useFormStore<Store extends TStore<TStoreKey>>() {
  return useContext(
    FormStoreContext as React.Context<
      FormStore<keyof Store, { [P in keyof Store]: string }, Store>
    >
  );
}
