import {
  TTransactionMutableSchema,
  TTransactionReadonlySchema,
  TTypedTransactionMutableSchema,
  TTypedTransactionReadonlySchema,
} from '@wallet/schemas';
import { TIndexable } from '@wallet/utilities/model.utility';
import { TIndexableSchema } from '@wallet/utilities/schema.utility';
import tap from 'tap';
import { IReply } from '../../src/models';
import {
  TIndexableTransactionReadonlyModel,
  TIndexableTransactionReadonlySchema,
  TransactionsController,
} from '../../src/transactions';
import { MockTransactionsAdapter } from '../../mocks/transactions/transactions.adapter.mock';
import { MockTransactionsRepository } from '../../mocks/transactions/transactions.repository.mock';

void tap.test('TransactionsController', (t) => {
  const params: TIndexableSchema = { id: 1 };

  const partialMutableTransactionSchema: Partial<TTransactionMutableSchema> = {
    date: '',
  };

  const mutableTransactionSchema: TTransactionMutableSchema = {
    cash: {
      cents: 0,
      currencyId: 1,
      units: 0,
    },
    date: '',
    tags: [],
    type: 'income',
  };

  const readonlyTransactionModel: TIndexableTransactionReadonlyModel = {
    cash: {
      cents: 0,
      currency: {
        code: '',
        decimal: '',
        id: 1,
        precision: 1,
        separator: '',
        symbol: '',
      },
      units: 0,
    },
    date: new Date(),
    id: 1,
    tags: [],
    type: 'expense',
  };

  const readonlyTransactionSchema: TIndexableTransactionReadonlySchema = {
    cash: {
      cents: 0,
      currency: {
        code: '',
        decimal: '',
        id: 1,
        precision: 1,
        separator: '',
        symbol: '',
      },
      units: 0,
    },
    date: '',
    id: 1,
    tags: [],
    type: 'expense',
  };

  void t.test('find', async (t) => {
    const expected: IReply<{
      Reply: TIndexable<TTransactionReadonlySchema>[];
    }> = {
      status: 200,
      data: [readonlyTransactionSchema],
      paging: undefined,
    };

    const repositoryMock = new MockTransactionsRepository({
      findResult: [readonlyTransactionModel],
    });
    const adapterMock = new MockTransactionsAdapter({
      readonlySchema: readonlyTransactionSchema,
    });
    const controller = new TransactionsController(repositoryMock, adapterMock);

    const result = await controller.find({
      query: partialMutableTransactionSchema,
      params: undefined,
      headers: undefined,
      body: undefined,
    });

    t.same(
      adapterMock.lastReadonlyModel,
      readonlyTransactionModel,
      'should convert the entity returned by the repository'
    );
    t.same(
      result,
      expected,
      'should respond with the entity returned by the adapter'
    );
    t.end();
  });

  void t.test('add', async (t) => {
    const expected: IReply<{ Reply: TTransactionReadonlySchema }> = {
      status: 201,
      data: readonlyTransactionSchema,
    };

    const repositoryMock = new MockTransactionsRepository({
      addResult: readonlyTransactionModel,
    });
    const adapterMock = new MockTransactionsAdapter({
      readonlySchema: readonlyTransactionSchema,
    });
    const controller = new TransactionsController(repositoryMock, adapterMock);

    const result = await controller.add({
      query: undefined,
      params: undefined,
      headers: undefined,
      body: mutableTransactionSchema,
    });

    t.same(
      adapterMock.lastReadonlyModel,
      readonlyTransactionModel,
      'should convert the entity returned by the repository'
    );
    t.same(
      result,
      expected,
      'should respond with the entity returned by the adapter'
    );
    t.end();
  });

  void t.test('update', async (t) => {
    const expected: IReply<{ Reply: TTransactionReadonlySchema }> = {
      status: 200,
      data: readonlyTransactionSchema,
    };

    const repositoryMock = new MockTransactionsRepository({
      updateResult: readonlyTransactionModel,
    });
    const adapterMock = new MockTransactionsAdapter({
      readonlySchema: readonlyTransactionSchema,
    });
    const controller = new TransactionsController(repositoryMock, adapterMock);

    const result = await controller.update({
      query: undefined,
      params,
      headers: undefined,
      body: mutableTransactionSchema,
    });

    t.same(
      adapterMock.lastReadonlyModel,
      readonlyTransactionModel,
      'should convert the entity returned by the repository'
    );
    t.same(
      result,
      expected,
      'should respond with the entity returned by the adapter'
    );
    t.end();
  });

  void t.test('remove', async (t) => {
    const expected: IReply<{ Reply: TTransactionReadonlySchema }> = {
      status: 200,
      data: readonlyTransactionSchema,
    };

    const repositoryMock = new MockTransactionsRepository({
      removeResult: readonlyTransactionModel,
    });
    const adapterMock = new MockTransactionsAdapter({
      readonlySchema: readonlyTransactionSchema,
    });
    const controller = new TransactionsController(repositoryMock, adapterMock);

    const result = await controller.remove({
      query: undefined,
      params,
      headers: undefined,
      body: undefined,
    });

    t.same(
      adapterMock.lastReadonlyModel,
      readonlyTransactionModel,
      'should convert the entity returned by the repository'
    );
    t.same(
      result,
      expected,
      'should respond with the entity returned by the adapter'
    );
    t.end();
  });

  void t.test('income', (t) => {
    const partialMutableIncomeSchema: Partial<TTypedTransactionMutableSchema> =
      {
        date: '',
      };

    const mutalbeIncomeSchema: TTypedTransactionMutableSchema = {
      cash: {
        cents: 0,
        currencyId: 1,
        units: 0,
      },
      date: '',
      tags: [],
    };

    const readonlyIncomeModel: TIndexableTransactionReadonlyModel = {
      cash: {
        cents: 0,
        currency: {
          code: '',
          decimal: '',
          id: 1,
          precision: 1,
          separator: '',
          symbol: '',
        },
        units: 0,
      },
      date: new Date(),
      id: 1,
      tags: [],
      type: 'income',
    };

    const readonlyIncomeSchema: TIndexableTransactionReadonlySchema = {
      cash: {
        cents: 0,
        currency: {
          code: '',
          decimal: '',
          id: 1,
          precision: 1,
          separator: '',
          symbol: '',
        },
        units: 0,
      },
      date: '',
      id: 1,
      tags: [],
      type: 'income',
    };

    void t.test('findIncome', async (t) => {
      const expected: IReply<{
        Reply: TIndexable<TTransactionReadonlySchema>[];
      }> = {
        status: 200,
        data: [readonlyIncomeSchema],
        paging: undefined,
      };

      const repositoryMock = new MockTransactionsRepository({
        findResult: [readonlyIncomeModel],
      });
      const adapterMock = new MockTransactionsAdapter({
        readonlySchema: readonlyIncomeSchema,
      });
      const controller = new TransactionsController(
        repositoryMock,
        adapterMock
      );

      const result = await controller.findIncome({
        query: partialMutableIncomeSchema,
        params: undefined,
        headers: undefined,
        body: undefined,
      });

      t.same(
        adapterMock.lastReadonlyModel,
        readonlyIncomeModel,
        'should convert the entity returned by the repository'
      );
      t.same(
        result,
        expected,
        'should respond with the entity returned by the adapter'
      );
      t.end();
    });

    void t.test('addIncome', async (t) => {
      const expected: IReply<{ Reply: TTypedTransactionReadonlySchema }> = {
        status: 201,
        data: readonlyIncomeSchema,
      };

      const repositoryMock = new MockTransactionsRepository({
        addResult: readonlyIncomeModel,
      });
      const adapterMock = new MockTransactionsAdapter({
        readonlySchema: readonlyIncomeSchema,
      });
      const controller = new TransactionsController(
        repositoryMock,
        adapterMock
      );

      const result = await controller.addIncome({
        query: undefined,
        params: undefined,
        headers: undefined,
        body: mutalbeIncomeSchema,
      });

      t.same(
        adapterMock.lastReadonlyModel,
        readonlyIncomeModel,
        'should convert the entity returned by the repository'
      );
      t.same(
        result,
        expected,
        'should respond with the entity returned by the adapter'
      );
      t.end();
    });

    void t.test('updateIncome', async (t) => {
      const expected: IReply<{ Reply: TTypedTransactionReadonlySchema }> = {
        status: 200,
        data: readonlyIncomeSchema,
      };

      const repositoryMock = new MockTransactionsRepository({
        updateResult: readonlyIncomeModel,
      });
      const adapterMock = new MockTransactionsAdapter({
        readonlySchema: readonlyIncomeSchema,
      });
      const controller = new TransactionsController(
        repositoryMock,
        adapterMock
      );

      const result = await controller.updateIncome({
        query: undefined,
        params,
        headers: undefined,
        body: partialMutableIncomeSchema,
      });

      t.same(
        adapterMock.lastReadonlyModel,
        readonlyIncomeModel,
        'should convert the entity returned by the repository'
      );
      t.same(
        result,
        expected,
        'should respond with the entity returned by the adapter'
      );
      t.end();
    });

    void t.test('removeIncome', async (t) => {
      const expected: IReply<{ Reply: TTransactionReadonlySchema }> = {
        status: 200,
        data: readonlyIncomeSchema,
      };

      const repositoryMock = new MockTransactionsRepository({
        removeResult: readonlyIncomeModel,
      });
      const adapterMock = new MockTransactionsAdapter({
        readonlySchema: readonlyIncomeSchema,
      });
      const controller = new TransactionsController(
        repositoryMock,
        adapterMock
      );

      const result = await controller.removeIncome({
        query: undefined,
        params,
        headers: undefined,
        body: undefined,
      });

      t.same(
        adapterMock.lastReadonlyModel,
        readonlyIncomeModel,
        'should convert the entity returned by the repository'
      );
      t.same(
        result,
        expected,
        'should respond with the entity returned by the adapter'
      );
      t.end();
    });

    t.end();
  });

  void t.test('expense', async (t) => {
    const partialMutableExpenseSchema: Partial<TTypedTransactionMutableSchema> =
      {
        tags: [],
      };

    const mutableExpenseSchema: TTypedTransactionMutableSchema = {
      cash: {
        cents: 0,
        currencyId: 0,
        units: 0,
      },
      date: '',
      tags: [],
    };

    const readonlyExpenseModel: TIndexableTransactionReadonlyModel = {
      cash: {
        cents: 0,
        currency: {
          code: '',
          decimal: '',
          id: 1,
          precision: 1,
          separator: '',
          symbol: '',
        },
        units: 0,
      },
      date: new Date(),
      id: 1,
      tags: [],
      type: 'expense',
    };

    const readonlyExpenseSchema: TIndexableTransactionReadonlySchema = {
      cash: {
        cents: 0,
        currency: {
          code: '',
          decimal: '',
          id: 1,
          precision: 1,
          separator: '',
          symbol: '',
        },
        units: 0,
      },
      date: '',
      id: 1,
      tags: [],
      type: 'expense',
    };

    void t.test('findExpenses', async (t) => {
      const expected: IReply<{
        Reply: TIndexableTransactionReadonlySchema[];
      }> = {
        status: 200,
        data: [readonlyExpenseSchema],
        paging: undefined,
      };

      const repositoryMock = new MockTransactionsRepository({
        findResult: [readonlyExpenseModel],
      });
      const adapterMock = new MockTransactionsAdapter({
        readonlySchema: readonlyExpenseSchema,
      });
      const controller = new TransactionsController(
        repositoryMock,
        adapterMock
      );

      const result = await controller.findExpenses({
        query: partialMutableExpenseSchema,
        params: undefined,
        headers: undefined,
        body: undefined,
      });

      t.same(
        adapterMock.lastReadonlyModel,
        readonlyExpenseModel,
        'should convert the entity returned by the repository'
      );
      t.same(
        result,
        expected,
        'should respond with the entity returned by the adapter'
      );
      t.end();
    });

    void t.test('addExpenses', async (t) => {
      const expected: IReply<{ Reply: TTransactionReadonlySchema }> = {
        status: 201,
        data: readonlyExpenseSchema,
      };

      const repositoryMock = new MockTransactionsRepository({
        addResult: readonlyExpenseModel,
      });
      const adapterMock = new MockTransactionsAdapter({
        readonlySchema: readonlyExpenseSchema,
      });
      const controller = new TransactionsController(
        repositoryMock,
        adapterMock
      );

      const result = await controller.addExpenses({
        query: undefined,
        params: undefined,
        headers: undefined,
        body: mutableExpenseSchema,
      });

      t.same(
        adapterMock.lastReadonlyModel,
        readonlyExpenseModel,
        'should convert the entity returned by the repository'
      );
      t.same(
        result,
        expected,
        'should respond with the entity returned by the adapter'
      );
      t.end();
    });

    void t.test('updateExpenses', async (t) => {
      const expected: IReply<{ Reply: TTransactionReadonlySchema }> = {
        status: 200,
        data: readonlyExpenseSchema,
      };

      const repositoryMock = new MockTransactionsRepository({
        updateResult: readonlyExpenseModel,
      });
      const adapterMock = new MockTransactionsAdapter({
        readonlySchema: readonlyExpenseSchema,
      });
      const controller = new TransactionsController(
        repositoryMock,
        adapterMock
      );

      const result = await controller.updateExpenses({
        query: undefined,
        params,
        headers: undefined,
        body: mutableExpenseSchema,
      });

      t.same(
        adapterMock.lastReadonlyModel,
        readonlyExpenseModel,
        'should convert the entity returned by the repository'
      );
      t.same(
        result,
        expected,
        'should respond with the entity returned by the adapter'
      );
      t.end();
    });

    void t.test('removeExpenses', async (t) => {
      const expectedResponse: IReply<{ Reply: TTransactionReadonlySchema }> = {
        status: 200,
        data: readonlyExpenseSchema,
      };

      const repositoryMock = new MockTransactionsRepository({
        removeResult: readonlyExpenseModel,
      });
      const adapterMock = new MockTransactionsAdapter({
        readonlySchema: readonlyExpenseSchema,
      });
      const controller = new TransactionsController(
        repositoryMock,
        adapterMock
      );

      const response = await controller.removeExpenses({
        query: undefined,
        params,
        headers: undefined,
        body: undefined,
      });

      t.same(
        adapterMock.lastReadonlyModel,
        readonlyExpenseModel,
        'should convert the entity returned by the repository'
      );
      t.same(
        response,
        expectedResponse,
        'should respond with the entity returned by the adapter'
      );
      t.end();
    });

    t.end();
  });

  t.end();
});
