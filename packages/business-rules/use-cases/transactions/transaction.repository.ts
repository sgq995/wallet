import { Transaction } from '../../entities/transaction.entity';
import { IRepository } from '../models';

export interface ITransactionRepository<TTransaction extends Transaction>
  extends IRepository<Transaction, TTransaction> {}
