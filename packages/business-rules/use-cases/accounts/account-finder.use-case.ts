import { Account } from '../../entities/account.entity';
import { Finder } from '../crud/finder.use-case';
import { IAccountRepository } from './account.repository';

export class AccountFinder<TAccount extends Account> extends Finder<
  Account,
  TAccount,
  IAccountRepository<TAccount>
> {}
