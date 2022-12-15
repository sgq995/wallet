import tap from 'tap';
import { TransactionsAdapter } from '../../src/transactions/transactions.adapter';
import { IAppTransactionModel } from '../../src/transactions/transactions.model';
import { TRestTransactionSchema } from '../../src/transactions/transactions.schema';
import { TIndexable } from '../../src/utilities/model.utility';

void tap.test('TransactionsAdapter', (t) => {
  void t.test('modelToRest', async (t) => {
    void t.test('should use "currency" if available', async (t) => {
      const entity: TIndexable<IAppTransactionModel> = {
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
      const expected: TIndexable<TRestTransactionSchema> = {
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
        repeat: undefined,
        period: undefined,
        tags: [],
      };

      const adapter = new TransactionsAdapter();
      const result = adapter.modelToRest(entity);

      t.same(result, expected);
      t.end();
    });

    void t.test('should use "currencyId" if available', async (t) => {
      const entity: TIndexable<IAppTransactionModel> = {
        id: 1,
        type: 'income',
        cash: {
          units: 1000,
          cents: 0,
          currencyId: 1,
        },
        date: new Date('2022-12-14T00:00:00Z'),
        tags: [],
      };
      const expected: TIndexable<TRestTransactionSchema> = {
        id: 1,
        type: 'income',
        cash: {
          units: 1000,
          cents: 0,
          currencyId: 1,
        },
        date: '2022-12-14T00:00:00Z',
        repeat: undefined,
        period: undefined,
        tags: [],
      };

      const adapter = new TransactionsAdapter();
      const result = adapter.modelToRest(entity);

      t.same(result, expected);
      t.end();
    });

    void t.test(
      'should throw if neither "currency" nor "currencyId" is provided',
      async (t) => {
        const entity: TIndexable<IAppTransactionModel> = {
          id: 1,
          type: 'income',
          cash: {
            units: 1000,
            cents: 0,
          },
          date: new Date('2022-12-14T00:00:00Z'),
          tags: [],
        };

        const adapter = new TransactionsAdapter();

        t.throws(() => adapter.modelToRest(entity));
        t.end();
      }
    );

    t.end();
  });

  void t.test('restToModel', async (t) => {
    void t.test('should use "currency" if available', async (t) => {
      const entity: TRestTransactionSchema = {
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
        tags: [],
      };
      const expected: IAppTransactionModel = {
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
          currencyId: undefined,
        },
        date: new Date('2022-12-14T00:00:00Z'),
        repeat: undefined,
        period: undefined,
        tags: [],
      };

      const adapter = new TransactionsAdapter();
      const result = adapter.restToModel(entity);

      t.same(result, expected);
      t.end();
    });

    void t.test('should use "currencyId" if available', async (t) => {
      const entity: TRestTransactionSchema = {
        type: 'income',
        cash: {
          units: 1000,
          cents: 0,
          currencyId: 1,
        },
        date: '2022-12-14T00:00:00Z',
        tags: [],
      };
      const expected: IAppTransactionModel = {
        type: 'income',
        cash: {
          units: 1000,
          cents: 0,
          currency: undefined,
          currencyId: 1,
        },
        date: new Date('2022-12-14T00:00:00Z'),
        repeat: undefined,
        period: undefined,
        tags: [],
      };

      const adapter = new TransactionsAdapter();
      const result = adapter.restToModel(entity);

      t.same(result, expected);
      t.end();
    });

    t.end();
  });

  t.end();
});
