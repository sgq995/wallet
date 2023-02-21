import { TAccountMutableSchema, TAccountReadonlySchema } from '@wallet/schemas';
import { TIndexable } from '@wallet/utilities/model.utility';
import tap from 'tap';
import {
  AccountsAdapter,
  IAccountMutableModel,
  IAccountReadonlyModel,
} from '../../src/accounts';

void tap.test('AccountsAdapter', (t) => {
  void t.test('readonlyModelToSchema', async (t) => {
    void t.test(
      'should convert readonly model to readonly schema',
      async (t) => {
        const entity: TIndexable<IAccountReadonlyModel> = {
          id: 1,
          label: 'account',
          currency: {
            id: 1,
            symbol: '$',
            separator: ',',
            decimal: '.',
            precision: 2,
            code: 'USD',
          },
          balance: {
            units: 1000,
            cents: 0,
          },
        };
        const expected: TIndexable<TAccountReadonlySchema> = {
          id: 1,
          label: 'account',
          currency: {
            id: 1,
            symbol: '$',
            separator: ',',
            decimal: '.',
            precision: 2,
            code: 'USD',
          },
          balance: {
            units: 1000,
            cents: 0,
          },
          startingBalance: undefined,
        };

        const adapter = new AccountsAdapter();
        const result = adapter.readonlyModelToSchema(entity);

        t.same(result, expected);
        t.end();
      }
    );

    t.end();
  });

  void t.test('mutableSchemaToModel', async (t) => {
    void t.test('should conver mutable schema to mutable model', async (t) => {
      const entity: TAccountMutableSchema = {
        label: 'account',
        currencyId: 1,
        balance: {
          units: 1000,
          cents: 0,
        },
      };
      const expected: IAccountMutableModel = {
        label: 'account',
        currencyId: 1,
        balance: {
          units: 1000,
          cents: 0,
        },
        startingBalance: undefined,
      };

      const adapter = new AccountsAdapter();
      const result = adapter.mutableSchemaToModel(entity);

      t.same(result, expected);
      t.end();
    });

    t.end();
  });

  t.end();
});
