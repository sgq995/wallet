import { useCallback, useContext, useEffect, useState } from 'react';
import { FormStoreContext } from '../context';

export function useControlledFormComponent<Value>(
  name: string,
  defaultValue?: Value
): [Value, (value: Value) => void] {
  const formStore = useContext(FormStoreContext);

  useEffect(() => {
    formStore.register({
      name,
      defaultValue,
    });
  }, [formStore, name, defaultValue]);

  const [state, setState] = useState<Value>(defaultValue);
  const setValue = useCallback(
    (value: Value) => {
      formStore.update({ name, rawValue: value });
      setState(value);
    },
    [formStore, name]
  );

  return [state, setValue];
}
