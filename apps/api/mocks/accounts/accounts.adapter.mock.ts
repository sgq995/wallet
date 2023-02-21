import { TAccountMutableSchema } from '@wallet/schemas';
import {
  AccountsAdapter,
  IAccountMutableModel,
  TIndexableAccountReadonlyModel,
  TIndexableAccountReadonlySchema,
} from '../../src/accounts';

export interface IMockAccountsAdapterParameters {
  readonlySchema?: TIndexableAccountReadonlySchema;
  mutableModel?: IAccountMutableModel;
}

export class MockAccountsAdapter extends AccountsAdapter {
  private _readonlyModel?: TIndexableAccountReadonlyModel;
  private _readonlySchema?: TIndexableAccountReadonlySchema;
  private _mutableSchema?: TAccountMutableSchema;
  private _mutableModel?: IAccountMutableModel;

  constructor({
    readonlySchema,
    mutableModel,
  }: IMockAccountsAdapterParameters) {
    super();

    this._readonlySchema = readonlySchema;
    this._mutableModel = mutableModel;
  }

  get lastReadonlyModel() {
    return this._readonlyModel;
  }

  override readonlyModelToSchema(model: unknown) {
    this._readonlyModel = model as TIndexableAccountReadonlyModel;
    return this._readonlySchema as unknown as TIndexableAccountReadonlySchema;
  }

  get lastMutableSchema() {
    return this._mutableSchema;
  }

  override mutableSchemaToModel(schema: unknown) {
    this._mutableSchema = schema as TAccountMutableSchema;
    return this._mutableModel as unknown as IAccountMutableModel;
  }
}
