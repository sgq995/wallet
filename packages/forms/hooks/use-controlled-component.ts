import { useCallback, useState } from 'react';
import {
  getFormLogicOptions,
  IUseFormLogicOptions,
  useFormLogic,
} from './use-form-logic';

export interface IUseControlledComponentOptions<T>
  extends IUseFormLogicOptions<T> {
  defaultValue: T;
}

export function useControlledComponent<T = string, E = unknown>(
  options?: IUseControlledComponentOptions<T>
) {
  const [value, setValue] = useState<T | undefined>(options?.defaultValue);
  const [error, setError] = useState<E | null>(null);
  const [isValid, setIsValid] = useState(true);

  const formLogic = useFormLogic<T, E>(getFormLogicOptions(options));

  const onChange = useCallback(
    (newValue: T) => {
      const { value, error, isValid } = formLogic(newValue);

      setValue(value);
      setError(error);
      setIsValid(isValid);
    },
    [formLogic]
  );

  return {
    value,
    error,
    onChange,
    isValid,
  };
}
