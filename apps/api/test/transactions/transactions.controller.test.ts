/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  TRestTransactionSchema,
  TRestTypedTransactionSchema,
} from '@wallet/schemas';
import { TIndexable } from '@wallet/utilities/model.utility';
import tap from 'tap';
import { IReply } from '../../src/models';
import {
  TransactionsAdapter,
  TransactionsController,
  IAppTransactionModel,
  TransactionsRepository,
} from '../../src/transactions';

void tap.test('TransactionsController', (t) => {
  const adapterMock: TransactionsAdapter = <TransactionsAdapter>{};
  const repositoryMock: TransactionsRepository = <TransactionsRepository>{};

  const controller = new TransactionsController(repositoryMock, adapterMock);

  void t.test('find', async (t) => {
    void t.test('should return all items', async (t) => {
      const params: { id: number } = <{ id: number }>{};
      const query: Partial<TRestTransactionSchema> = {};
      const expected: IReply<{ Reply: TIndexable<TRestTransactionSchema>[] }> =
        {
          status: 200,
          data: [
            { id: undefined } as unknown as TIndexable<TRestTransactionSchema>,
          ],
        };

      adapterMock.restToModel = (model) =>
        model as unknown as IAppTransactionModel;
      adapterMock.modelToRest = (model) =>
        model as unknown as TIndexable<TRestTransactionSchema>;
      repositoryMock.find = async (id, query) => [
        <TIndexable<IAppTransactionModel>>{ id },
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

    void t.test('should return selected item', async (t) => {
      const id = 1;
      const params: { id: number } = { id };
      const query: Partial<TRestTransactionSchema> = {};
      const expected: IReply<{ Reply: TIndexable<TRestTransactionSchema> }> = {
        status: 200,
        data: { id } as unknown as TIndexable<TRestTransactionSchema>,
      };

      adapterMock.restToModel = (model) =>
        model as unknown as IAppTransactionModel;
      adapterMock.modelToRest = (model) =>
        model as unknown as TIndexable<TRestTransactionSchema>;
      repositoryMock.find = async (id, query) => [
        <TIndexable<IAppTransactionModel>>{ id },
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
    void t.test('should create a new transaction', async (t) => {
      const body: TRestTransactionSchema = <TRestTransactionSchema>{};

      const transaction: TIndexable<IAppTransactionModel> = //
        <TIndexable<IAppTransactionModel>>{};

      const expected: IReply<{ Reply: TRestTransactionSchema }> = {
        status: 201,
        data: transaction as unknown as TRestTransactionSchema,
      };

      adapterMock.restToModel = (model) =>
        model as unknown as IAppTransactionModel;
      adapterMock.modelToRest = (model) =>
        model as unknown as TIndexable<TRestTransactionSchema>;
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
    void t.test('should update a transaction', async (t) => {
      const id = 1;
      const params: { id: number } = { id };
      const body: TRestTransactionSchema = <TRestTransactionSchema>{
        tags: ['test'],
      };

      const transaction: TIndexable<IAppTransactionModel> = //
        <TIndexable<IAppTransactionModel>>{
          id,
          tags: ['test'],
        };

      const expected: IReply<{ Reply: TRestTransactionSchema }> = {
        status: 200,
        data: transaction as unknown as TRestTransactionSchema,
      };

      adapterMock.restToModel = (model) =>
        model as unknown as IAppTransactionModel;
      adapterMock.modelToRest = (model) =>
        model as unknown as TIndexable<TRestTransactionSchema>;
      repositoryMock.update = async (id, transaction) =>
        <TIndexable<IAppTransactionModel>>{
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
    void t.test('should remove a transaction', async (t) => {
      const id = 1;
      const params: { id: number } = { id };

      const expected: IReply<{ Reply: TRestTransactionSchema }> = {
        status: 200,
        data: { id } as unknown as TRestTransactionSchema,
      };

      adapterMock.restToModel = (model) =>
        model as unknown as IAppTransactionModel;
      adapterMock.modelToRest = (model) =>
        model as unknown as TIndexable<TRestTransactionSchema>;
      repositoryMock.remove = async (id) =>
        <TIndexable<IAppTransactionModel>>{
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

  void t.test('findIncome', async (t) => {
    void t.test('should return all income items', async (t) => {
      const params: { id: number } = <{ id: number }>{};
      const query: Partial<TRestTransactionSchema> = {};
      const expected: IReply<{ Reply: TIndexable<TRestTransactionSchema>[] }> =
        {
          status: 200,
          data: [
            { id: undefined } as unknown as TIndexable<TRestTransactionSchema>,
          ],
        };

      adapterMock.restToModel = (model) =>
        model as unknown as IAppTransactionModel;
      adapterMock.modelToRest = (model) =>
        model as unknown as TIndexable<TRestTransactionSchema>;
      repositoryMock.find = async (id, query) => [
        <TIndexable<IAppTransactionModel>>{ id },
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

  void t.test('addIncome', async (t) => {
    void t.test('should create a new income transaction', async (t) => {
      const body: TRestTypedTransactionSchema = <TRestTypedTransactionSchema>{};

      const expected: IReply<{ Reply: TRestTypedTransactionSchema }> = {
        status: 201,
        data: {
          type: 'income',
        } as unknown as TRestTypedTransactionSchema,
      };

      adapterMock.restToModel = (model) =>
        model as unknown as IAppTransactionModel;
      adapterMock.modelToRest = (model) =>
        model as unknown as TIndexable<TRestTransactionSchema>;
      repositoryMock.add = async (entity) =>
        entity as TIndexable<IAppTransactionModel>;

      const result = await controller.addIncome({
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

  void t.test('updateIncome', async (t) => {
    void t.test('should update a income transaction', async (t) => {
      const id = 1;
      const params: { id: number } = { id };
      const body: TRestTransactionSchema = <TRestTransactionSchema>{
        tags: ['test'],
      };

      const transaction: TIndexable<IAppTransactionModel> = //
        <TIndexable<IAppTransactionModel>>{
          id,
          type: 'income',
          tags: ['test'],
        };

      const expected: IReply<{ Reply: TRestTransactionSchema }> = {
        status: 200,
        data: transaction as unknown as TRestTransactionSchema,
      };

      adapterMock.restToModel = (model) =>
        model as unknown as IAppTransactionModel;
      adapterMock.modelToRest = (model) =>
        model as unknown as TIndexable<TRestTransactionSchema>;
      repositoryMock.update = async (id, entity) =>
        <TIndexable<IAppTransactionModel>>{
          id,
          ...entity,
        };

      const result = await controller.updateIncome({
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

  void t.test('removeIncome', async (t) => {
    void t.test('should remove a income transaction', async (t) => {
      const id = 1;
      const params: { id: number } = { id };

      const expected: IReply<{ Reply: TRestTransactionSchema }> = {
        status: 200,
        data: { id } as unknown as TRestTransactionSchema,
      };

      adapterMock.restToModel = (model) =>
        model as unknown as IAppTransactionModel;
      adapterMock.modelToRest = (model) =>
        model as unknown as TIndexable<TRestTransactionSchema>;
      repositoryMock.remove = async (id) =>
        <TIndexable<IAppTransactionModel>>{
          id,
        };

      const result = await controller.removeIncome({
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

  void t.test('findExpenses', async (t) => {
    void t.test('should return all expense items', async (t) => {
      const params: { id: number } = <{ id: number }>{};
      const query: Partial<TRestTransactionSchema> = {};
      const expected: IReply<{ Reply: TIndexable<TRestTransactionSchema>[] }> =
        {
          status: 200,
          data: [
            {
              id: undefined,
              type: 'expense',
            } as unknown as TIndexable<TRestTransactionSchema>,
          ],
        };

      adapterMock.restToModel = (model) =>
        model as unknown as IAppTransactionModel;
      adapterMock.modelToRest = (model) =>
        model as unknown as TIndexable<TRestTransactionSchema>;
      repositoryMock.find = async (id, query) => [
        <TIndexable<IAppTransactionModel>>{ id, ...query },
      ];

      const result = await controller.findExpenses({
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

  void t.test('addExpenses', async (t) => {
    void t.test('should create a new expense transaction', async (t) => {
      const body: TRestTransactionSchema = <TRestTransactionSchema>{};

      const transaction: TIndexable<IAppTransactionModel> = //
        <TIndexable<IAppTransactionModel>>{
          type: 'expense',
        };

      const expected: IReply<{ Reply: TRestTransactionSchema }> = {
        status: 201,
        data: transaction as unknown as TRestTransactionSchema,
      };

      adapterMock.restToModel = (model) =>
        model as unknown as IAppTransactionModel;
      adapterMock.modelToRest = (model) =>
        model as unknown as TIndexable<TRestTransactionSchema>;
      repositoryMock.add = async (entity) =>
        entity as TIndexable<IAppTransactionModel>;

      const result = await controller.addExpenses({
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

  void t.test('updateExpenses', async (t) => {
    void t.test('should update a expense transaction', async (t) => {
      const id = 1;
      const params: { id: number } = { id };
      const body: TRestTransactionSchema = <TRestTransactionSchema>{
        tags: ['test'],
      };

      const transaction: TIndexable<IAppTransactionModel> = //
        <TIndexable<IAppTransactionModel>>{
          id,
          type: 'expense',
          tags: ['test'],
        };

      const expected: IReply<{ Reply: TRestTransactionSchema }> = {
        status: 200,
        data: transaction as unknown as TRestTransactionSchema,
      };

      adapterMock.restToModel = (model) =>
        model as unknown as IAppTransactionModel;
      adapterMock.modelToRest = (model) =>
        model as unknown as TIndexable<TRestTransactionSchema>;
      repositoryMock.update = async (id, transaction) =>
        <TIndexable<IAppTransactionModel>>{
          id,
          ...transaction,
        };

      const result = await controller.updateExpenses({
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

  void t.test('removeExpenses', async (t) => {
    void t.test('should remove a expense transaction', async (t) => {
      const id = 1;
      const params: { id: number } = { id };

      const expected: IReply<{ Reply: TRestTransactionSchema }> = {
        status: 200,
        data: { id } as unknown as TRestTransactionSchema,
      };

      adapterMock.restToModel = (model) =>
        model as unknown as IAppTransactionModel;
      adapterMock.modelToRest = (model) =>
        model as unknown as TIndexable<TRestTransactionSchema>;
      repositoryMock.remove = async (id) =>
        <TIndexable<IAppTransactionModel>>{
          id,
        };

      const result = await controller.removeExpenses({
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
