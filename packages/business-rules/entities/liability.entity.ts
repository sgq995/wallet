import { Cash } from './cash.entity';
import { TimePeriod } from './time-period.entity';

export type TLiabilityPayment = {
  cash: Cash;
  period: TimePeriod;
};

export class Liability {
  constructor(
    public cash: Cash,
    public date: Date,
    public interest: number,
    public payment: TLiabilityPayment,
    public tags: string[]
  ) {}
}
