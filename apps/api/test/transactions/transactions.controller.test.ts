/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import tap from 'tap';
import { IReply } from '../../src/models';
import { TransactionsAdapter } from '../../src/transactions/transactions.adapter';
import { TransactionsController } from '../../src/transactions/transactions.controller';
import { IAppTransactionModel } from '../../src/transactions/transactions.model';
import { TransactionsRepository } from '../../src/transactions/transactions.repository';
import { TRestTransactionSchema } from '../../src/transactions/transactions.schema';
import { TIndexable } from '../../src/utilities/model.utility';

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

  t.end();
});
