import { Transaction } from '../../entities/transaction.entity';
import { Updater } from '../crud/updater.use-case';
import { ITransactionRepository } from './transaction.repository';

export class TransactionUpdater<
  TTransaction extends Transaction
> extends Updater<
  Transaction,
  TTransaction,
  ITransactionRepository<TTransaction>
> {}
