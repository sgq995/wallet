import { Account } from '../../entities/account.entity';
import { IRepository } from '../models';

export interface IAccountRepository<TAccount extends Account>
  extends IRepository<Account, TAccount> {}
