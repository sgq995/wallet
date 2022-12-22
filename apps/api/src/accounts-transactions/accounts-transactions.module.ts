import { PrismaClient } from '@prisma/client';
import { AppModule } from '../models/module.model';
import { TransactionsController } from '../transactions';
import { AccountsTransactionsController } from './accounts-transactions.controller';
import { AccountsTransactionsRepository } from './accounts-transactions.repository';

export class AccountsTransactionsModule extends AppModule {
  private _controller: AccountsTransactionsController;
  private _repository: AccountsTransactionsRepository;

  constructor(
    prisma: PrismaClient,
    transactionsController: TransactionsController
  ) {
    super();

    this._repository = new AccountsTransactionsRepository(prisma);
    this._controller = new AccountsTransactionsController(
      this._repository,
      transactionsController
    );
  }

  static dependencies(): unknown[] {
    return [PrismaClient, TransactionsController];
  }

  static provides(): unknown[] {
    return [AccountsTransactionsController, AccountsTransactionsRepository];
  }

  definitions(): unknown[] {
    return [this._controller, this._repository];
  }
}
