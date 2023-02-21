import { TTransactionMutableSchema } from '@wallet/schemas';
import {
  ITransactionMutableModel,
  TIndexableTransactionReadonlyModel,
  TIndexableTransactionReadonlySchema,
  TransactionsAdapter,
} from '../../src/transactions';

export interface IMockTransactionAdapterParameters {
  readonlySchema?: TIndexableTransactionReadonlySchema;
  mutableModel?: ITransactionMutableModel;
}

export class MockTransactionsAdapter extends TransactionsAdapter {
  private _readonlyModel?: TIndexableTransactionReadonlyModel;
  private _readonlySchema?: TIndexableTransactionReadonlySchema;
  private _mutableSchema?: TTransactionMutableSchema;
  private _mutableModel?: ITransactionMutableModel;

  constructor({
    readonlySchema,
    mutableModel,
  }: IMockTransactionAdapterParameters) {
    super();

    this._readonlySchema = readonlySchema;
    this._mutableModel = mutableModel;
  }

  get lastReadonlyModel() {
    return this._readonlyModel;
  }

  override readonlyModelToSchema(model: unknown) {
    this._readonlyModel = model as TIndexableTransactionReadonlyModel;
    return this
      ._readonlySchema as unknown as TIndexableTransactionReadonlySchema;
  }

  get lastMutableSchema() {
    return this._mutableSchema;
  }

  override mutableSchemaToModel(schema: unknown) {
    this._mutableSchema = schema as TTransactionMutableSchema;
    return this._mutableModel as unknown as ITransactionMutableModel;
  }
}
