import { useCallback, useContext } from 'react';
import { FormContext } from '../context';

export function useFormDataSelector() {
  const { state } = useContext(FormContext);

  return useCallback(() => {
    return {
      ...state.defaultValues,
      ...state.controlled?.values,
    };
  }, [state]);
}
