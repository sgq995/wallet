import { TAccountMutableSchema, TAccountReadonlySchema } from '@wallet/schemas';
import { TIndexable } from '@wallet/utilities/model.utility';
import { IAccountMutableModel, IAccountReadonlyModel } from './accounts.model';

export type TIndexableAccountReadonlyModel = TIndexable<IAccountReadonlyModel>;

export type TIndexableAccountReadonlySchema =
  TIndexable<TAccountReadonlySchema>;

export type TPartialAccountReadonlyModel =
  Partial<TIndexableAccountReadonlyModel>;

export type TPartialAccountReadonlySchema =
  Partial<TIndexableAccountReadonlySchema>;

export type TPartialAccountMutableModel =
  Partial<IAccountMutableModel>;

export type TPartialAccountMutableSchema =
  Partial<TAccountMutableSchema>;
