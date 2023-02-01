import { useCallback, useEffect, useState } from 'react';
import { IFormComponentOptions } from './types';
import { useFormStore } from './use-form-store';

export interface IUseControlledFormComponentOptions<Value>
  extends IFormComponentOptions<Value> {}

export function useControlledFormComponent<Value>(
  name: string,
  options?: IUseControlledFormComponentOptions<Value>
): [Value, (value: Value) => void] {
  const { defaultValue } = options ?? {};
  const formStore = useFormStore();

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
