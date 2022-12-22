import { PrismaClient } from '@prisma/client';
import {
  HttpBadRequestError,
  HttpNotFoundError,
} from '../utilities/http.utility';

export class AccountsTransactionsRepository {
  constructor(private _prisma: PrismaClient) {}

  async verifyAccountExists(accountId?: number) {
    if (!accountId) {
      return;
    }

    const account = await this._prisma.account.findUnique({
      where: { id: accountId },
    });
    if (!account) {
      throw new HttpNotFoundError('account not found');
    }
  }

  async verifyTransactionOwnership(accountId?: number, transactionId?: number) {
    if (!transactionId) {
      return;
    }

    const transaction = await this._prisma.transaction.findUnique({
      where: { id: transactionId },
    });
    if (!transaction) {
      throw new HttpNotFoundError('transaction not found');
    }

    if (transaction.accountId !== accountId) {
      throw new HttpBadRequestError(
        'transaction is not linked to this account'
      );
    }
  }
}
