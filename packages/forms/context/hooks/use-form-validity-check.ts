import { useContext } from 'react';
import { FormContext } from '../context';

export function useFormValidityCheck() {
  const { state } = useContext(FormContext);

  return {
    ...state.controlled?.isValid,
  };
}
