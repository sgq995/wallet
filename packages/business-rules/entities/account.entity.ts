import { Cash } from './cash.entity';
import { Currency } from './currency.entity';

export class Account {
  constructor(
    public label: string,
    public currency: Currency,
    public startingBalance: Cash,
    public balance: Cash
  ) {}
}
