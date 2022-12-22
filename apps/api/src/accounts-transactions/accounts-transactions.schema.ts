import { Static, Type } from '@sinclair/typebox';

export const WithAccountId = Type.Object({
  accountId: Type.Integer(),
});

export type TWithAccountId = Static<typeof WithAccountId>;

export const WithTransactionId = Type.Object({
  transactionId: Type.Integer(),
});

export type TWithTransactionId = Static<typeof WithTransactionId>;
