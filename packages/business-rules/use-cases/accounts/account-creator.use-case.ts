import { Account } from '../../entities/account.entity';
import { Creator } from '../crud/creator.use-case';
import { IAccountRepository } from './account.repository';

export class AccountCreator<TAccount extends Account> extends Creator<
  Account,
  TAccount,
  IAccountRepository<TAccount>
> {}
