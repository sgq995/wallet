import { useCallback, useEffect, useState } from 'react';
import { IFormComponentOptions } from './types';
import { useFormStore } from './use-form-store';

export interface IUseControlledFormComponentOptions<Value = unknown>
  extends IFormComponentOptions<Value> {}

export function useControlledFormComponent<Value = unknown>(
  name: string,
  options?: IUseControlledFormComponentOptions<Value>
): [string, (value: string) => void] {
  const { defaultValue, rawValidator, parser, validator } = options ?? {};
  const formStore = useFormStore();

  useEffect(() => {
    formStore.register({
      name,
      defaultValue,
      rawValidator,
      parser,
      validator,
    });

    return () => {
      formStore.unregister(name);
    };
  }, [formStore, name, defaultValue, rawValidator, parser, validator]);

  const [state, setState] = useState(defaultValue);
  const setValue = useCallback(
    (value: string) => {
      formStore.update({ name, rawValue: value });
      setState(value);
    },
    [formStore, name]
  );

  return [state, setValue];
}
