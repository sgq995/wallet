import { TTransactionMutableSchema } from '@wallet/schemas';
import tap from 'tap';
import {
  TIndexableTransactionReadonlyModel,
  TIndexableTransactionReadonlySchema,
} from '../../src/transactions';
import { TransactionsAdapter } from '../../src/transactions/transactions.adapter';
import { ITransactionMutableModel } from '../../src/transactions/transactions.model';

void tap.test('TransactionsAdapter', (t) => {
  void t.test('readonlyModelToSchema', async (t) => {
    void t.test(
      'should convert readonly model to readonly schema',
      async (t) => {
        const entity: TIndexableTransactionReadonlyModel = {
          id: 1,
          type: 'income',
          cash: {
            units: 1000,
            cents: 0,
            currency: {
              id: 1,
              symbol: '$',
              separator: ',',
              decimal: '.',
              precision: 2,
              code: 'USD',
            },
          },
          date: new Date('2022-12-14T00:00:00Z'),
          tags: [],
        };
        const expected: TIndexableTransactionReadonlySchema = {
          id: 1,
          type: 'income',
          cash: {
            units: 1000,
            cents: 0,
            currency: {
              id: 1,
              symbol: '$',
              separator: ',',
              decimal: '.',
              precision: 2,
              code: 'USD',
            },
          },
          date: '2022-12-14T00:00:00Z',
          description: undefined,
          repeat: undefined,
          period: undefined,
          tags: [],
          accountId: undefined,
        };

        const adapter = new TransactionsAdapter();
        const result = adapter.readonlyModelToSchema(entity);

        t.same(result, expected);
        t.end();
      }
    );

    t.end();
  });

  void t.test('mutableSchemaToModel', async (t) => {
    void t.test('should convert mutable schema to mutable model', async (t) => {
      const entity: TTransactionMutableSchema = {
        type: 'income',
        cash: {
          units: 1000,
          cents: 0,
          currencyId: 1,
        },
        date: '2022-12-14T00:00:00Z',
        description: undefined,
        repeat: undefined,
        period: undefined,
        tags: [],
        accountId: undefined,
      };

      const expected: ITransactionMutableModel = {
        type: 'income',
        cash: {
          units: 1000,
          cents: 0,
          currencyId: 1,
        },
        date: new Date('2022-12-14T00:00:00Z'),
        tags: [],
        accountId: undefined,
        description: undefined,
        period: undefined,
        repeat: undefined,
      };

      const adapter = new TransactionsAdapter();
      const result = adapter.mutableSchemaToModel(entity);

      t.same(result, expected);
      t.end();
    });

    t.end();
  });

  t.end();
});
