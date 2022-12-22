import tap from 'tap';
import { AccountsAdapter } from '../../src/accounts/accounts.adapter';
import { IAppAccountModel } from '../../src/accounts/accounts.model';
import { TRestAccountSchema } from '../../src/accounts/accounts.schema';
import { TIndexable } from '../../src/utilities/model.utility';

void tap.test('AccountsAdapter', (t) => {
  void t.test('modelToRest', async (t) => {
    void t.test('should convert app model to rest model', async (t) => {
      const entity: TIndexable<IAppAccountModel> = {
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
      const expected: TIndexable<TRestAccountSchema> = {
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
      const result = adapter.modelToRest(entity);

      t.same(result, expected);
      t.end();
    });

    t.end();
  });

  void t.test('restToModel', async (t) => {
    void t.test('should convert rest model to app model', async (t) => {
      const entity: TRestAccountSchema = {
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
      const expected: IAppAccountModel = {
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
      const result = adapter.restToModel(entity);

      t.same(result, expected);
      t.end();
    });

    t.end();
  });

  t.end();
});
