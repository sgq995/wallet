import { TAccountMutableSchema } from '@wallet/schemas';
import { IMutableAdapter, IReadonlyAdapter } from '../models';
import { IAccountMutableModel } from './accounts.model';
import {
  TIndexableAccountReadonlyModel,
  TIndexableAccountReadonlySchema,
  TPartialAccountMutableModel,
  TPartialAccountMutableSchema,
  TPartialAccountReadonlyModel,
  TPartialAccountReadonlySchema,
} from './accounts.types';

export class AccountsAdapter
  implements
    IReadonlyAdapter<
      TIndexableAccountReadonlyModel,
      TIndexableAccountReadonlySchema
    >,
    IReadonlyAdapter<
      TPartialAccountReadonlyModel,
      TPartialAccountReadonlySchema
    >,
    IMutableAdapter<IAccountMutableModel, TAccountMutableSchema>,
    IMutableAdapter<TPartialAccountMutableModel, TPartialAccountMutableSchema>
{
  readonlyModelToSchema(
    entity: TIndexableAccountReadonlyModel
  ): TIndexableAccountReadonlySchema;
  readonlyModelToSchema(
    entity: TPartialAccountReadonlyModel
  ): TPartialAccountReadonlySchema;
  readonlyModelToSchema(
    entity: TIndexableAccountReadonlyModel | TPartialAccountReadonlyModel
  ): TIndexableAccountReadonlySchema | TPartialAccountReadonlySchema {
    const id: TPartialAccountReadonlySchema['id'] = entity.id;

    const label: TPartialAccountReadonlySchema['label'] = entity.label;

    const currency: TPartialAccountReadonlySchema['currency'] = entity.currency
      ? {
          id: entity.currency.id,
          symbol: entity.currency.symbol,
          separator: entity.currency.separator,
          decimal: entity.currency.decimal,
          precision: entity.currency.precision,
          code: entity.currency.code,
        }
      : undefined;

    const startingBalance: TPartialAccountReadonlySchema['startingBalance'] =
      entity.startingBalance
        ? {
            units: entity.startingBalance.units,
            cents: entity.startingBalance.cents,
          }
        : undefined;

    const balance: TPartialAccountReadonlySchema['balance'] = entity.balance
      ? {
          units: entity.balance.units,
          cents: entity.balance.cents,
        }
      : undefined;

    return {
      id,
      label,
      currency,
      startingBalance,
      balance,
    };
  }

  readonlySchemaToModel(
    _entity: TIndexableAccountReadonlySchema
  ): TIndexableAccountReadonlyModel {
    throw new Error('Method not implemented.');
  }

  mutableModelToSchema(_entity: TAccountMutableSchema): TAccountMutableSchema {
    throw new Error('Method not implemented.');
  }

  mutableSchemaToModel(entity: TAccountMutableSchema): TAccountMutableSchema;
  mutableSchemaToModel(
    entity: TPartialAccountMutableSchema
  ): TPartialAccountMutableModel;
  mutableSchemaToModel(
    entity: TAccountMutableSchema | TPartialAccountMutableSchema
  ): TAccountMutableSchema | TPartialAccountMutableModel {
    const label: TPartialAccountMutableModel['label'] = entity.label;

    const currencyId: TPartialAccountMutableModel['currencyId'] =
      entity.currencyId;

    const startingBalance: TPartialAccountMutableModel['startingBalance'] =
      entity.startingBalance
        ? {
            units: entity.startingBalance.units,
            cents: entity.startingBalance.cents,
          }
        : undefined;

    const balance: TPartialAccountMutableModel['balance'] = entity.balance
      ? {
          units: entity.balance.units,
          cents: entity.balance.cents,
        }
      : undefined;

    return {
      label,
      currencyId,
      startingBalance,
      balance,
    };
  }
}
