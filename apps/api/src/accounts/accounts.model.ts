import { TIndexable } from '@wallet/utilities/model.utility';
import { IAppCashValueModel, IAppCurrencyModel } from '../models';

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
