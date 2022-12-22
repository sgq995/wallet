import { PrismaClient } from '@prisma/client';
import { AppModule } from '../models/module.model';
import { TransactionsController } from '../transactions';
import { AccountsAdapter } from './accounts.adapter';
import { AccountsController } from './accounts.controller';
import { AccountsRepository } from './accounts.repository';

export class AccountsModule extends AppModule {
  private _adapter: AccountsAdapter;
  private _controller: AccountsController;
  private _repository: AccountsRepository;

  constructor(prisma: PrismaClient) {
    super();

    this._adapter = new AccountsAdapter();
    this._repository = new AccountsRepository(prisma);
    this._controller = new AccountsController(this._repository, this._adapter);
  }

  static dependencies(): unknown[] {
    return [PrismaClient];
  }

  static provides(): unknown[] {
    return [AccountsController, AccountsRepository];
  }

  definitions(): unknown[] {
    return [this._controller, this._repository];
  }
}
