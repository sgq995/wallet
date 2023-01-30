import { useContext } from 'react';
import { FormStoreContext } from '../context';

export function useFormStore() {
  return useContext(FormStoreContext);
}
