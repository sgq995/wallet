import { TValidator } from './validator';

export function composeValidatorFactory<T>(...validators: TValidator<T>[]) {
  return function composedValidator(value: T) {
    validators.forEach((validator) => validator(value));
  };
}
