import {
  ITransactionMutableModel,
  TIndexableTransactionReadonlyModel,
  TransactionsRepository,
} from '../../src/transactions';
import { IPagingModel } from '../../src/models/paging.model';
import { MockPrismaClient } from '../prisma/prisma.mock';

export interface MockTransactionsRepositoryParameters {
  paging?: IPagingModel;
  findResult?: TIndexableTransactionReadonlyModel[];
  addResult?: TIndexableTransactionReadonlyModel;
  updateResult?: TIndexableTransactionReadonlyModel;
  removeResult?: TIndexableTransactionReadonlyModel;
}

export class MockTransactionsRepository extends TransactionsRepository {
  private _paging?: IPagingModel;
  private _findResult?: TIndexableTransactionReadonlyModel[];
  private _addResult?: TIndexableTransactionReadonlyModel;
  private _updateResult?: TIndexableTransactionReadonlyModel;
  private _removeResult?: TIndexableTransactionReadonlyModel;

  constructor({
    paging,
    findResult,
    addResult,
    updateResult,
    removeResult,
  }: MockTransactionsRepositoryParameters) {
    super(new MockPrismaClient());

    this._paging = paging;
    this._findResult = findResult;
    this._addResult = addResult;
    this._updateResult = updateResult;
    this._removeResult = removeResult;
  }

  override async find(
    id?: number | undefined,
    filter?: Partial<ITransactionMutableModel> | undefined,
    requestPaging?: IPagingModel | undefined
  ): Promise<{
    transactions: TIndexableTransactionReadonlyModel[];
    paging: IPagingModel;
  }> {
    return {
      transactions: this
        ._findResult as unknown as TIndexableTransactionReadonlyModel[],
      paging: this._paging as unknown as IPagingModel,
    };
  }

  override async add(
    Transaction: ITransactionMutableModel
  ): Promise<TIndexableTransactionReadonlyModel> {
    return this._addResult as unknown as TIndexableTransactionReadonlyModel;
  }

  override async update(
    id: number,
    Transaction: Partial<ITransactionMutableModel>
  ): Promise<TIndexableTransactionReadonlyModel> {
    return this._updateResult as unknown as TIndexableTransactionReadonlyModel;
  }

  override async remove(
    id: number
  ): Promise<TIndexableTransactionReadonlyModel> {
    return this._removeResult as unknown as TIndexableTransactionReadonlyModel;
  }
}
