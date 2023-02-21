import {
  AccountsRepository,
  IAccountMutableModel,
  TIndexableAccountReadonlyModel,
} from '../../src/accounts';
import { IPagingModel } from '../../src/models/paging.model';
import { MockPrismaClient } from '../prisma/prisma.mock';

export interface MockAccountsRepositoryParameters {
  paging?: IPagingModel;
  findResult?: TIndexableAccountReadonlyModel[];
  addResult?: TIndexableAccountReadonlyModel;
  updateResult?: TIndexableAccountReadonlyModel;
  removeResult?: TIndexableAccountReadonlyModel;
}

export class MockAccountsRepository extends AccountsRepository {
  private _paging?: IPagingModel;
  private _findResult?: TIndexableAccountReadonlyModel[];
  private _addResult?: TIndexableAccountReadonlyModel;
  private _updateResult?: TIndexableAccountReadonlyModel;
  private _removeResult?: TIndexableAccountReadonlyModel;

  constructor({
    paging,
    findResult,
    addResult,
    updateResult,
    removeResult,
  }: MockAccountsRepositoryParameters) {
    super(new MockPrismaClient());

    this._paging = paging;
    this._findResult = findResult;
    this._addResult = addResult;
    this._updateResult = updateResult;
    this._removeResult = removeResult;
  }

  override async find(
    id?: number | undefined,
    filter?: Partial<IAccountMutableModel> | undefined,
    requestPaging?: IPagingModel | undefined
  ): Promise<{
    accounts: TIndexableAccountReadonlyModel[];
    paging: IPagingModel;
  }> {
    return {
      accounts: this._findResult as unknown as TIndexableAccountReadonlyModel[],
      paging: this._paging as unknown as IPagingModel,
    };
  }

  override async add(
    account: IAccountMutableModel
  ): Promise<TIndexableAccountReadonlyModel> {
    return this._addResult as unknown as TIndexableAccountReadonlyModel;
  }

  override async update(
    id: number,
    account: Partial<IAccountMutableModel>
  ): Promise<TIndexableAccountReadonlyModel> {
    return this._updateResult as unknown as TIndexableAccountReadonlyModel;
  }

  override async remove(id: number): Promise<TIndexableAccountReadonlyModel> {
    return this._removeResult as unknown as TIndexableAccountReadonlyModel;
  }
}
