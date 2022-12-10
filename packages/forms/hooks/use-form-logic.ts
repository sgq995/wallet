import { useCallback } from 'react';

export interface IUseFormLogicOptions<T> {
  filter?: (value: T) => T;
  validator?: (value: T) => boolean;
}

export function useFormLogic<T, E>(options?: IUseFormLogicOptions<T>) {
  const { filter, validator } = options ?? {};

  return useCallback(
    (newValue: T) => {
      const value = filter?.(newValue) ?? newValue;

      let isValid, error: E | null;
      try {
        isValid = validator?.(value) ?? true;
        error = null;
      } catch (e) {
        isValid = false;
        error = <E>e;
      }

      return {
        value,
        error,
        isValid,
      };
    },
    [filter, validator]
  );
}

export function getFormLogicOptions<
  T,
  IOptions extends IUseFormLogicOptions<T>
>(options?: IOptions): IUseFormLogicOptions<T> | undefined {
  if (!options) {
    return undefined;
  }

  return {
    filter: options.filter,
    validator: options.validator,
  };
}
