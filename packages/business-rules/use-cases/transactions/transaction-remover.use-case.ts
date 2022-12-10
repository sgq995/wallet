import { Transaction } from '../../entities/transaction.entity';
import { Remover } from '../crud/remover.use-case';
import { ITransactionRepository } from './transaction.repository';

export class TransactionRemover<
  TTransaction extends Transaction
> extends Remover<
  Transaction,
  TTransaction,
  ITransactionRepository<TTransaction>
> {}
