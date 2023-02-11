import { PrismaClient } from '@prisma/client';
import {
  HttpBadRequestError,
  HttpNotFoundError,
} from '@wallet/utilities/http.utility';
import { TIndex } from '@wallet/utilities/model.utility';

export class AccountsTransactionsRepository {
  constructor(private _prisma: PrismaClient) {}

  async verifyAccountExists(accountId?: TIndex) {
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

  async verifyTransactionOwnership(accountId?: TIndex, transactionId?: TIndex) {
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
