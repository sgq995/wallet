import { IUseFormLogicOptions } from '../hooks';

export type TFormValidator<T> = Required<IUseFormLogicOptions<T>>['validator'];

export function composedValidator<T>(
  ...validators: TFormValidator<T>[]
): TFormValidator<T> {
  return (value: T) => {
    return validators.every((validator) => {
      return validator(value);
    });
  };
}
