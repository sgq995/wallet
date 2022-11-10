import { useCallback, useContext } from 'react';
import { FormContext } from '../context';
import { event } from '../event';

export function useFormResetEvent() {
  const { dispatch } = useContext(FormContext);

  return useCallback(() => {
    dispatch(event.reset());
  }, [dispatch]);
}
