import { numberRangeValidatorFactory } from './validators/number-range-factory.validator';

export class Money {
  private _centsValidator = numberRangeValidatorFactory({ min: 0 });

  constructor(public units: number, private _cents: number) {
    this._centsValidator(_cents);
  }

  get cents() {
    return this._cents;
  }

  set cents(cents: number) {
    this._centsValidator(cents);
    this._cents = cents;
  }
}
