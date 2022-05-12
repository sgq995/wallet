import { FastifyPluginAsync } from 'fastify';

import { Request, Reply } from 'schemas/accounts';

import {
  replyCreated,
  replyNotFound,
  replyOK,
} from '../../utils/response-builder';
import { DefaultRouteHandlerMethod } from '../../utils/types';

const findAll: DefaultRouteHandlerMethod<{
  Querystring: Request.TQuery;
  Reply: Reply.TFindAll;
}> = async function (request, reply) {
  const query = request.query;
  const allAccounts = await this.prisma.account.findMany({
    where: {
      AND: {
        id: query.id,
        name: query.name
          ? {
              contains: query.name,
            }
          : query.name,
        balance: query.balance,
      },
    },
  });
  replyOK(reply, allAccounts);
};

const addOne: DefaultRouteHandlerMethod<{
  Body: Request.TAddOne;
  Reply: Reply.TAddOne;
}> = async function (request, reply) {
  const account = request.body;
  const createdAccount = await this.prisma.account.create({
    data: {
      name: account.name,
      balance: account.balance,
    },
  });
  replyCreated(reply, createdAccount);
};

const findOne: DefaultRouteHandlerMethod<{
  Params: Request.TParams;
  Reply: Reply.TFindOne;
}> = async function (request, reply) {
  const id = request.params.id;
  try {
    const account = await this.prisma.account.findUnique({
      where: {
        id,
      },
      rejectOnNotFound: true,
    });

    replyOK(reply, account);
  } catch (e) {
    replyNotFound(reply, `Account id ${id} was not found`);
  }
};

const updateOne: DefaultRouteHandlerMethod<{
  Body: Request.TUpdateOne;
  Params: Request.TParams;
  Reply: Reply.TUpdateOne;
}> = async function (request, reply) {
  const id = request.params.id;
  const account = request.body;
  try {
    const updatedAccount = await this.prisma.account.update({
      where: {
        id,
      },
      data: {
        name: account.name,
        balance: account.balance,
      },
    });

    replyOK(reply, updatedAccount);
  } catch (e) {
    replyNotFound(reply, `Account id ${id} was not found`);
  }
};

const removeOne: DefaultRouteHandlerMethod<{
  Params: Request.TParams;
  Reply: Reply.TRemoveOne;
}> = async function (request, reply) {
  const id = request.params.id;
  try {
    const deletedAccount = await this.prisma.account.delete({
      where: {
        id,
      },
    });

    replyOK(reply, deletedAccount);
  } catch (e) {
    replyNotFound(reply, `Account id ${id} was not found`);
  }
};

const controller: FastifyPluginAsync = async (fastify, options) => {
  fastify.get(
    '/',
    { schema: { querystring: Request.Query, response: Reply.FindAll } },
    findAll
  );
  fastify.post(
    '/',
    { schema: { body: Request.AddOne, response: Reply.AddOne } },
    addOne
  );
  fastify.get(
    '/:id',
    { schema: { params: Request.Params, response: Reply.FindOne } },
    findOne
  );
  fastify.put(
    '/:id',
    {
      schema: {
        body: Request.UpdateOne,
        params: Request.Params,
        response: Reply.UpdateOne,
      },
    },
    updateOne
  );
  fastify.delete(
    '/:id',
    { schema: { params: Request.Params, response: Reply.RemoveOne } },
    removeOne
  );
};

export default controller;
