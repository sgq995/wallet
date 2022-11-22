import { Account } from '../../entities/account.entity';
import { Remover } from '../crud/remover.use-case';
import { IAccountRepository } from './account.repository';

export class AccountRemover<TAccount extends Account> extends Remover<
  Account,
  TAccount,
  IAccountRepository<TAccount>
> {}
