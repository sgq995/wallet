import { TIndex, TIndexable } from '@wallet/utilities/model.utility';
import { ICashBaseModel, ICurrencyModel } from '../models';

export interface IAccountBaseModel {
  label: string;
  startingBalance?: ICashBaseModel;
  balance: ICashBaseModel;
}

export interface IAccountReadonlyModel extends IAccountBaseModel {
  currency: TIndexable<ICurrencyModel>;
}

export interface IAccountMutableModel extends IAccountBaseModel {
  currencyId: TIndex;
}
