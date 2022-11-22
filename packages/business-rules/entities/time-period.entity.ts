import { numberRangeValidatorFactory } from './validators/number-range-factory.validator';

export enum Periodicty {
  Daily = 'daily',
  Weekly = 'weekly',
  Monthly = 'monthly',
  Quarterly = 'quarterly',
  Semesterly = 'semesterly',
  Yearly = 'yearly',
}

export type TPeriodValue = number | 'first' | 'last';

export class TimePeriod {
  private _unitsValidator = {
    [Periodicty.Daily]: numberRangeValidatorFactory({ min: 1, max: 31 }),
    [Periodicty.Weekly]: numberRangeValidatorFactory({ min: 1, max: 52 }),
    [Periodicty.Monthly]: numberRangeValidatorFactory({ min: 1, max: 12 }),
    [Periodicty.Quarterly]: numberRangeValidatorFactory({ min: 1, max: 4 }),
    [Periodicty.Semesterly]: numberRangeValidatorFactory({
      min: 1,
      max: 2,
    }),
  };

  constructor(public periodicity: Periodicty, private _units: TPeriodValue) {
    if (typeof _units === 'number') {
      this._validatePeriod(periodicity, _units);
    }
  }

  get units() {
    return this._units;
  }

  set units(units: TPeriodValue) {
    this._validatePeriod(this.periodicity, units);
    this._units = units;
  }

  private _validatePeriod(periodicity: Periodicty, units: TPeriodValue) {
    if (typeof units === 'number') {
      this._unitsValidator[periodicity]?.(units);
    }
  }
}
