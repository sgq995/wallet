/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import tap from 'tap';
import { IReply } from '../../src/models';
import {
  AccountsAdapter,
  AccountsController,
  AccountsRepository,
  IAppAccountModel,
  IAppCreateAccountModel,
  TRestAccountSchema,
  TRestCreateAccountSchema,
} from '../../src/accounts';
import { TIndexable } from '../../src/utilities/model.utility';

void tap.test('AccountsController', (t) => {
  const adapterMock: AccountsAdapter = <AccountsAdapter>{};
  const repositoryMock: AccountsRepository = <AccountsRepository>{};

  const controller = new AccountsController(repositoryMock, adapterMock);

  void t.test('find', async (t) => {
    void t.test('should return all accounts', async (t) => {
      const params: { id: number } = <{ id: number }>{};
      const query: Partial<TRestAccountSchema> = {};
      const expected: IReply<{ Reply: TIndexable<TRestAccountSchema>[] }> = {
        status: 200,
        data: [{ id: undefined } as unknown as TIndexable<TRestAccountSchema>],
      };

      adapterMock.restToModel = (model) =>
        model as unknown as IAppAccountModel & IAppCreateAccountModel;
      adapterMock.modelToRest = (model) =>
        model as unknown as TIndexable<TRestAccountSchema>;
      repositoryMock.find = async (id, query) => [
        <TIndexable<IAppAccountModel>>{ id },
      ];

      const result = await controller.find({
        query,
        params,
        headers: undefined,
        body: undefined,
      });

      t.same(result, expected);
      t.end();
    });

    void t.test('should return selected account', async (t) => {
      const id = 1;
      const params: { id: number } = { id };
      const query: Partial<TRestAccountSchema> = {};
      const expected: IReply<{ Reply: TIndexable<TRestAccountSchema> }> = {
        status: 200,
        data: { id } as unknown as TIndexable<TRestAccountSchema>,
      };

      adapterMock.restToModel = (model) =>
        model as unknown as IAppAccountModel & IAppCreateAccountModel;
      adapterMock.modelToRest = (model) =>
        model as unknown as TIndexable<TRestAccountSchema>;
      repositoryMock.find = async (id, query) => [
        <TIndexable<IAppAccountModel>>{ id },
      ];

      const result = await controller.find({
        query,
        params,
        headers: undefined,
        body: undefined,
      });

      t.same(result, expected);
      t.end();
    });

    t.end();
  });

  void t.test('add', async (t) => {
    void t.test('should create a new account', async (t) => {
      const body: TRestCreateAccountSchema = <TRestCreateAccountSchema>{};

      const transaction: TIndexable<IAppAccountModel> = //
        <TIndexable<IAppAccountModel>>{};

      const expected: IReply<{ Reply: TRestAccountSchema }> = {
        status: 201,
        data: transaction as unknown as TRestAccountSchema,
      };

      adapterMock.restToModel = (model) =>
        model as unknown as IAppCreateAccountModel & IAppAccountModel;
      adapterMock.modelToRest = (model) =>
        model as unknown as TIndexable<TRestAccountSchema>;
      repositoryMock.add = async () => transaction;

      const result = await controller.add({
        query: undefined,
        params: undefined,
        headers: undefined,
        body,
      });

      t.same(result, expected);
      t.end();
    });

    t.end();
  });

  void t.test('update', async (t) => {
    void t.test('should update an account', async (t) => {
      const id = 1;
      const params: { id: number } = { id };
      const body: TRestAccountSchema = <TRestAccountSchema>{
        label: 'test',
      };

      const transaction: TIndexable<IAppAccountModel> = //
        <TIndexable<IAppAccountModel>>{
          id,
          label: 'test',
        };

      const expected: IReply<{ Reply: TRestAccountSchema }> = {
        status: 200,
        data: transaction as unknown as TRestAccountSchema,
      };

      adapterMock.restToModel = (model) =>
        model as unknown as IAppAccountModel & IAppCreateAccountModel;
      adapterMock.modelToRest = (model) =>
        model as unknown as TIndexable<TRestAccountSchema>;
      repositoryMock.update = async (id, transaction) =>
        <TIndexable<IAppAccountModel>>{
          id,
          ...transaction,
        };

      const result = await controller.update({
        query: undefined,
        params,
        headers: undefined,
        body,
      });

      t.same(result, expected);
      t.end();
    });

    t.end();
  });

  void t.test('remove', async (t) => {
    void t.test('should remove an account', async (t) => {
      const id = 1;
      const params: { id: number } = { id };

      const expected: IReply<{ Reply: TRestAccountSchema }> = {
        status: 200,
        data: { id } as unknown as TRestAccountSchema,
      };

      adapterMock.restToModel = (model) =>
        model as unknown as IAppAccountModel & IAppCreateAccountModel;
      adapterMock.modelToRest = (model) =>
        model as unknown as TIndexable<TRestAccountSchema>;
      repositoryMock.remove = async (id) =>
        <TIndexable<IAppAccountModel>>{
          id,
        };

      const result = await controller.remove({
        query: undefined,
        params,
        headers: undefined,
        body: undefined,
      });

      t.same(result, expected);
      t.end();
    });

    t.end();
  });

  t.end();
});
