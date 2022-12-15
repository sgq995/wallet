import { PrismaClient } from '@prisma/client';
import { AppModule } from '../models/module.model';
import { TransactionsAdapter } from './transactions.adapter';
import { TransactionsController } from './transactions.controller';
import { TransactionsRepository } from './transactions.repository';

export class TransactionModule extends AppModule {
  private _adapter: TransactionsAdapter;
  private _controller: TransactionsController;
  private _repository: TransactionsRepository;

  constructor(prisma: PrismaClient) {
    super();

    this._repository = new TransactionsRepository(prisma);
    this._adapter = new TransactionsAdapter();
    this._controller = new TransactionsController(
      this._repository,
      this._adapter
    );
  }

  static dependencies(): unknown[] {
    return [PrismaClient];
  }

  static provides(): unknown[] {
    return [TransactionsController, TransactionsRepository];
  }

  definitions(): unknown[] {
    return [this._controller, this._repository];
  }
}
