import { Static } from '@sinclair/typebox';

import { HttpBadRequest, HttpNotFound } from '../commons/reply';

import { ComposeStatic, Created, OK } from '../helpers/responses';
import { ArrayOfTransactionModel, TransactionModel } from './model';

export const TransactionArrayOK = OK(ArrayOfTransactionModel);

export type TTransactionArrayOK = Static<typeof TransactionArrayOK['200']>;

export const TransactionCreated = Created(TransactionModel);

export type TTransactionCreated = Static<typeof TransactionCreated['201']>;

export const TransactionOK = OK(TransactionModel);

export type TTransactionOK = Static<typeof TransactionOK['200']>;

export const TransactionRecord = {
  ...TransactionOK,
  ...HttpNotFound,
};

export type TTransactionRecord = ComposeStatic<typeof TransactionRecord>;

export const FindAll = {
  ...TransactionArrayOK,
  ...HttpBadRequest,
};

export type TFindAll = ComposeStatic<typeof FindAll>;

export type TFindAllData = ComposeStatic<typeof TransactionArrayOK>;

export type TFindAllError = ComposeStatic<typeof HttpBadRequest>;

export const AddOne = {
  ...TransactionCreated,
  ...HttpBadRequest,
};

export type TAddOne = ComposeStatic<typeof AddOne>;

export type TAddOneData = ComposeStatic<typeof TransactionCreated>;

export type TAddOneError = ComposeStatic<typeof HttpBadRequest>;

export const FindOne = {
  ...TransactionOK,
  ...HttpBadRequest,
  ...HttpNotFound,
};

export type TFindOne = ComposeStatic<typeof FindOne>;

export const UpdateOne = {
  ...TransactionOK,
  ...HttpBadRequest,
  ...HttpNotFound,
};

export type TUpdateOne = ComposeStatic<typeof UpdateOne>;

export const RemoveOne = {
  ...TransactionOK,
  ...HttpBadRequest,
  ...HttpNotFound,
};

export type TRemoveOne = ComposeStatic<typeof RemoveOne>;
