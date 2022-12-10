import { TValidator } from './validator';

export type NumberRangeValidatorOptions = {
  min?: number;
  max?: number;
};

export function numberRangeValidatorFactory({
  min,
  max,
}: NumberRangeValidatorOptions): TValidator<number> {
  return function validator(value: number) {
    if (min && value < min) {
      throw new RangeError(
        `Expect ${value} to be greater or equal than ${min}`
      );
    }

    if (max && value > max) {
      throw new RangeError(`Expect ${value} to be less or equal than ${max}`);
    }
  };
}
