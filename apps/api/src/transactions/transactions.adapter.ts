import { TTransactionMutableSchema } from '@wallet/schemas';
import { dateTime } from '@wallet/utilities/date.utility';
import { IMutableAdapter, IReadonlyAdapter } from '../models';
import { ITransactionMutableModel } from './transactions.model';
import {
  TIndexableTransactionReadonlyModel,
  TIndexableTransactionReadonlySchema,
  TPartialTransactionMutableModel,
  TPartialTransactionMutableSchema,
  TPartialTransactionReadonlyModel,
  TPartialTransactionReadonlySchema,
} from './transactions.types';

export class TransactionsAdapter
  implements
    IReadonlyAdapter<
      TIndexableTransactionReadonlyModel,
      TIndexableTransactionReadonlySchema
    >,
    IReadonlyAdapter<
      TPartialTransactionReadonlyModel,
      TPartialTransactionReadonlySchema
    >,
    IMutableAdapter<ITransactionMutableModel, TTransactionMutableSchema>,
    IMutableAdapter<
      TPartialTransactionMutableModel,
      TPartialTransactionMutableSchema
    >
{
  readonlyModelToSchema(
    entity: TIndexableTransactionReadonlyModel
  ): TIndexableTransactionReadonlySchema;
  readonlyModelToSchema(
    entity: TPartialTransactionReadonlyModel
  ): TPartialTransactionReadonlySchema;
  readonlyModelToSchema(
    entity:
      | TIndexableTransactionReadonlyModel
      | TPartialTransactionReadonlyModel
  ): TIndexableTransactionReadonlySchema | TPartialTransactionReadonlySchema {
    const id: TPartialTransactionReadonlySchema['id'] = entity.id;

    const type: TPartialTransactionReadonlySchema['type'] = entity.type;

    const cash: TPartialTransactionReadonlySchema['cash'] = entity.cash
      ? {
          units: entity.cash.units,
          cents: entity.cash.cents,
          currency: {
            id: entity.cash.currency.id,
            precision: entity.cash.currency.precision,
            symbol: entity.cash.currency.symbol,
            code: entity.cash.currency.code,
            decimal: entity.cash.currency.decimal,
            separator: entity.cash.currency.separator,
          },
        }
      : undefined;

    const date: TPartialTransactionReadonlySchema['date'] = entity.date
      ? dateTime(entity.date, true)
      : undefined;

    const description: TPartialTransactionReadonlySchema['description'] =
      entity.description;

    const repeat: TPartialTransactionReadonlySchema['repeat'] = entity.repeat;

    const period: TPartialTransactionReadonlySchema['period'] = entity.period
      ? {
          periodicity: entity.period.periodicity,
          when: entity.period.when,
        }
      : undefined;

    const tags: TPartialTransactionReadonlySchema['tags'] = entity.tags
      ? [...entity.tags]
      : undefined;

    const accountId: TPartialTransactionReadonlySchema['accountId'] =
      entity.accountId;

    return {
      id,
      type,
      cash,
      date,
      description,
      repeat,
      period,
      tags,
      accountId,
    };
  }

  readonlySchemaToModel(
    entity: TIndexableTransactionReadonlySchema
  ): TIndexableTransactionReadonlyModel {
    throw new Error('Method not implemented.');
  }

  mutableModelToSchema(
    entity: ITransactionMutableModel
  ): TTransactionMutableSchema {
    throw new Error('Method not implemented.');
  }

  mutableSchemaToModel(
    entity: TTransactionMutableSchema
  ): ITransactionMutableModel;
  mutableSchemaToModel(
    entity: TPartialTransactionMutableSchema
  ): TPartialTransactionMutableModel;
  mutableSchemaToModel(
    entity: TTransactionMutableSchema | TPartialTransactionMutableSchema
  ): ITransactionMutableModel | TPartialTransactionMutableModel {
    const type: TPartialTransactionMutableModel['type'] = entity.type;

    const cash: TPartialTransactionMutableModel['cash'] = entity.cash
      ? {
          units: entity.cash.units,
          cents: entity.cash.cents,
          currencyId: entity.cash.currencyId,
        }
      : undefined;

    const date: TPartialTransactionMutableModel['date'] = entity.date
      ? new Date(entity.date)
      : undefined;

    const description: TPartialTransactionMutableModel['description'] =
      entity.description;

    const repeat: TPartialTransactionMutableModel['repeat'] = entity.repeat;

    const period: TPartialTransactionMutableModel['period'] = entity.period
      ? {
          periodicity: entity.period.periodicity,
          when: entity.period.when,
        }
      : undefined;

    const tags: TPartialTransactionMutableModel['tags'] = entity.tags
      ? [...entity.tags]
      : undefined;

    const accountId: TPartialTransactionMutableModel['accountId'] =
      entity.accountId;

    return {
      type,
      cash,
      date,
      description,
      repeat,
      period,
      tags,
      accountId,
    };
  }
}
