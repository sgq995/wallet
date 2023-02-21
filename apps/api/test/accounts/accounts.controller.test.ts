import tap from 'tap';
import { TAccountMutableSchema, TAccountReadonlySchema } from '@wallet/schemas';
import { IReply } from '../../src/models';
import {
  AccountsController,
  TIndexableAccountReadonlyModel,
  TIndexableAccountReadonlySchema,
} from '../../src/accounts';
import { TIndexable } from '@wallet/utilities/model.utility';
import { MockAccountsAdapter } from '../../mocks/accounts/accounts.adapter.mock';
import { MockAccountsRepository } from '../../mocks/accounts/accounts.repository.mock';
import { TIndexableSchema } from '@wallet/utilities/schema.utility';

void tap.test('AccountsController', (t) => {
  const params: TIndexableSchema = { id: 1 };

  const partialMutableAccountSchema: Partial<TAccountMutableSchema> = {
    label: '',
  };

  const mutableAccountSchema: TAccountMutableSchema = {
    balance: {
      cents: 0,
      units: 0,
    },
    currencyId: 1,
    label: '',
    startingBalance: {
      cents: 0,
      units: 0,
    },
  };

  const readonlyAccountModel: TIndexableAccountReadonlyModel = {
    balance: {
      cents: 0,
      units: 0,
    },
    currency: {
      code: '',
      decimal: '',
      id: 1,
      precision: 1,
      separator: '',
      symbol: '',
    },
    id: 1,
    label: '',
    startingBalance: {
      cents: 0,
      units: 0,
    },
  };

  const readonlyAccountSchema: TIndexableAccountReadonlySchema = {
    balance: {
      cents: 0,
      units: 0,
    },
    currency: {
      code: '',
      decimal: '',
      id: 1,
      precision: 1,
      separator: '',
      symbol: '',
    },
    id: 1,
    label: '',
    startingBalance: {
      cents: 0,
      units: 0,
    },
  };

  void t.test('find', async (t) => {
    const expected: IReply<{ Reply: TIndexable<TAccountReadonlySchema>[] }> = {
      status: 200,
      data: [readonlyAccountSchema],
      paging: undefined,
    };

    const repositoryMock = new MockAccountsRepository({
      findResult: [readonlyAccountModel],
    });
    const adapterMock = new MockAccountsAdapter({
      readonlySchema: readonlyAccountSchema,
    });
    const controller = new AccountsController(repositoryMock, adapterMock);

    const result = await controller.find({
      query: partialMutableAccountSchema,
      params: undefined,
      headers: undefined,
      body: undefined,
    });

    t.same(
      adapterMock.lastReadonlyModel,
      readonlyAccountModel,
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
    const expected: IReply<{ Reply: TAccountReadonlySchema }> = {
      status: 201,
      data: readonlyAccountSchema,
    };

    const repositoryMock = new MockAccountsRepository({
      addResult: readonlyAccountModel,
    });
    const adapterMock = new MockAccountsAdapter({
      readonlySchema: readonlyAccountSchema,
    });
    const controller = new AccountsController(repositoryMock, adapterMock);

    const result = await controller.add({
      query: undefined,
      params: undefined,
      headers: undefined,
      body: mutableAccountSchema,
    });

    t.same(
      adapterMock.lastReadonlyModel,
      readonlyAccountModel,
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
    const expected: IReply<{ Reply: TAccountReadonlySchema }> = {
      status: 200,
      data: readonlyAccountSchema,
    };

    const repositoryMock = new MockAccountsRepository({
      updateResult: readonlyAccountModel,
    });
    const adapterMock = new MockAccountsAdapter({
      readonlySchema: readonlyAccountSchema,
    });
    const controller = new AccountsController(repositoryMock, adapterMock);

    const result = await controller.update({
      query: undefined,
      params,
      headers: undefined,
      body: partialMutableAccountSchema,
    });

    t.same(
      adapterMock.lastReadonlyModel,
      readonlyAccountModel,
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
    const expected: IReply<{ Reply: TAccountReadonlySchema }> = {
      status: 200,
      data: readonlyAccountSchema,
    };

    const repositoryMock = new MockAccountsRepository({
      removeResult: readonlyAccountModel,
    });
    const adapterMock = new MockAccountsAdapter({
      readonlySchema: readonlyAccountSchema,
    });
    const controller = new AccountsController(repositoryMock, adapterMock);

    const result = await controller.remove({
      query: undefined,
      params,
      headers: undefined,
      body: undefined,
    });

    t.same(
      adapterMock.lastReadonlyModel,
      readonlyAccountModel,
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
