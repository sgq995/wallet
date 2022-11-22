import { Currency } from './currency.entity';
import { Money } from './money.entity';

export class Cash {
  constructor(public money: Money, public currency: Currency) {}
}
