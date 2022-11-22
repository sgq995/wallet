import { Account } from '../../entities/account.entity';
import { Updater } from '../crud/updater.use-case';
import { IAccountRepository } from './account.repository';

export class AccountUpdater<TAccount extends Account> extends Updater<
  Account,
  TAccount,
  IAccountRepository<TAccount>
> {}
