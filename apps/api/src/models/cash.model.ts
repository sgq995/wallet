import { TIndex, TIndexable } from '@wallet/utilities/model.utility';
import { ICurrencyModel } from './currency.model';

export interface ICashBaseModel {
  units: number;
  cents: number;
}

export interface ICashReadonlyModel extends ICashBaseModel {
  currency: TIndexable<ICurrencyModel>;
}

export interface ICashMutableModel extends ICashBaseModel {
  currencyId: TIndex;
}
