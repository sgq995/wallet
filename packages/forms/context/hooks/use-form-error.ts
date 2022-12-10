import { useContext } from 'react';
import { FormContext } from '../context';

export function useFormError() {
  const { state } = useContext(FormContext);

  return {
    ...state.controlled?.error,
  };
}
