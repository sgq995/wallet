import { AppModule } from '../models/module.model';
import { TransactionsController } from '../transactions';
import { AccountsTransactionsController } from './accounts-transactions.controller';

export class AccountsTransactionsModule extends AppModule {
  private _controller: AccountsTransactionsController;

  constructor(transactionsController: TransactionsController) {
    super();

    this._controller = new AccountsTransactionsController(
      transactionsController
    );
  }

  static dependencies(): unknown[] {
    return [TransactionsController];
  }

  static provides(): unknown[] {
    return [AccountsTransactionsController];
  }

  definitions(): unknown[] {
    return [this._controller];
  }
}
