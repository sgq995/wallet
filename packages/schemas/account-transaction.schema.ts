import { Static, Type } from '@sinclair/typebox';
import { IndexType } from '@wallet/utilities/schema.utility';

export const AccountIdSchema = Type.Object({
  accountId: IndexType,
});

export type TAccountIdSchema = Static<typeof AccountIdSchema>;

export const TransactionIdSchema = Type.Object({
  transactionId: IndexType,
});

export type TTransactionIdSchema = Static<typeof TransactionIdSchema>;
