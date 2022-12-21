import { IAppCashValueModel, IAppCurrencyModel } from '../models';
import { TIndexable } from '../utilities/model.utility';

export interface IAppAccountBaseModel {
  label: string;
  startingBalance?: IAppCashValueModel;
  balance: IAppCashValueModel;
}

export interface IAppAccountModel extends IAppAccountBaseModel {
  currency: TIndexable<IAppCurrencyModel>;
}

export interface IAppCreateAccountModel extends IAppAccountBaseModel {
  currencyId: number;
}
