import { Transaction } from '../../entities/transaction.entity';
import { Finder } from '../crud/finder.use-case';
import { ITransactionRepository } from './transaction.repository';

export class TransactionFinder<TTransaction extends Transaction> extends Finder<
  Transaction,
  TTransaction,
  ITransactionRepository<TTransaction>
> {}
