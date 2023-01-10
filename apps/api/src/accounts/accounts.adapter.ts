import { TRestAccountSchema, TRestCreateAccountSchema } from '@wallet/schemas';
import { TIndexable, TRecursivePartial } from '@wallet/utilities';
import { IAdapter } from '../models';
import { IAppAccountModel, IAppCreateAccountModel } from './accounts.model';

export class AccountsAdapter
  implements IAdapter<IAppAccountModel, TRestAccountSchema>
{
  modelToRest(
    this: void,
    entity: TIndexable<IAppAccountModel>
  ): TIndexable<TRestAccountSchema>;
  modelToRest(
    this: void,
    entity: TIndexable<Partial<IAppAccountModel>>
  ): TIndexable<Partial<TRestAccountSchema>>;
  modelToRest(
    this: void,
    entity: TIndexable<IAppAccountModel> | TIndexable<Partial<IAppAccountModel>>
  ): TIndexable<TRestAccountSchema> | TIndexable<Partial<TRestAccountSchema>> {
    const currency: TRestAccountSchema['currency'] | undefined = entity.currency
      ? {
          id: entity.currency.id,
          symbol: entity.currency.symbol,
          separator: entity.currency.separator,
          decimal: entity.currency.decimal,
          precision: entity.currency.precision,
          code: entity.currency.code,
        }
      : undefined;

    const startingBalance: TRestAccountSchema['startingBalance'] =
      entity.startingBalance
        ? {
            units: entity.startingBalance.units,
            cents: entity.startingBalance.cents,
          }
        : undefined;

    const balance: TRestAccountSchema['balance'] | undefined = entity.balance
      ? {
          units: entity.balance.units,
          cents: entity.balance.cents,
        }
      : undefined;

    return {
      id: entity.id,
      label: entity.label,
      currency,
      startingBalance,
      balance,
    };
  }

  restToModel(this: void, entity: TRestAccountSchema): IAppAccountModel;
  restToModel(
    this: void,
    entity: Partial<TRestAccountSchema>
  ): Partial<IAppAccountModel>;
  restToModel(
    this: void,
    entity: TRecursivePartial<TRestAccountSchema>
  ): TRecursivePartial<IAppAccountModel>;
  restToModel(
    this: void,
    entity: TRestCreateAccountSchema
  ): IAppCreateAccountModel;
  restToModel(
    this: void,
    entity:
      | TRestAccountSchema
      | Partial<TRestAccountSchema>
      | TRestCreateAccountSchema
  ): IAppAccountModel | Partial<IAppAccountModel> | IAppCreateAccountModel {
    const currencyId: number | undefined =
      'currencyId' in entity && entity.currencyId
        ? entity.currencyId
        : undefined;

    const currency: IAppAccountModel['currency'] | undefined =
      'currency' in entity && entity.currency
        ? {
            id: entity.currency.id,
            symbol: entity.currency.symbol,
            separator: entity.currency.separator,
            decimal: entity.currency.decimal,
            precision: entity.currency.precision,
            code: entity.currency.code,
          }
        : undefined;

    const startingBalance: IAppAccountModel['startingBalance'] =
      entity.startingBalance
        ? {
            units: entity.startingBalance.units,
            cents: entity.startingBalance.cents,
          }
        : undefined;

    const balance: IAppAccountModel['balance'] | undefined = entity.balance
      ? {
          units: entity.balance.units,
          cents: entity.balance.cents,
        }
      : undefined;

    return {
      label: entity.label,
      ...('currency' in entity ? { currency } : {}),
      ...('currencyId' in entity ? { currencyId } : {}),
      startingBalance,
      balance,
    };
  }
}
