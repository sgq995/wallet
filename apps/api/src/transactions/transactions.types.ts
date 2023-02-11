import {
  TTransactionMutableSchema,
  TTransactionReadonlySchema,
} from '@wallet/schemas';
import { TIndexable } from '@wallet/utilities/model.utility';
import {
  ITransactionMutableModel,
  ITransactionReadonlyModel,
} from './transactions.model';

export type TIndexableTransactionReadonlyModel =
  TIndexable<ITransactionReadonlyModel>;

export type TIndexableTransactionReadonlySchema =
  TIndexable<TTransactionReadonlySchema>;

export type TPartialTransactionReadonlyModel =
  Partial<TIndexableTransactionReadonlyModel>;

export type TPartialTransactionReadonlySchema =
  Partial<TIndexableTransactionReadonlySchema>;

export type TPartialTransactionMutableModel = Partial<ITransactionMutableModel>;

export type TPartialTransactionMutableSchema =
  Partial<TTransactionMutableSchema>;
