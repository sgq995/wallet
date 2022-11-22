import { Transaction } from '../../entities/transaction.entity';
import { Creator } from '../crud/creator.use-case';
import { ITransactionRepository } from './transaction.repository';

export class TransactionCreator<
  TTransaction extends Transaction
> extends Creator<
  Transaction,
  TTransaction,
  ITransactionRepository<TTransaction>
> {}
