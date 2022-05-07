import { FastifyPluginAsync } from 'fastify';

import { Reply, Request } from 'schemas/entries';

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
  const allEntries = await this.prisma.entry.findMany({
    where: {
      AND: {
        id: query.id,
        description: query.description
          ? {
              contains: query.description,
            }
          : query.description,
        amount: query.amount,
        date: query.date ? new Date(query.date) : query.date,
        typeId: query.typeId,
        accountId: query.accountId,
        categoryId: query.categoryId,
      },
    },
  });
  replyOK(reply, allEntries);
};

const addOne: DefaultRouteHandlerMethod<{
  Body: Request.TAddOne;
  Reply: Reply.TAddOne;
}> = async function (request, reply) {
  const entry = request.body;
  const createdEntry = await this.prisma.entry.create({
    data: {
      description: entry.description,
      amount: entry.amount,
      date: new Date(entry.date),
      typeId: entry.typeId,
      accountId: entry.accountId,
      categoryId: entry.categoryId,
    },
  });
  replyCreated(reply, createdEntry);
};

const findOne: DefaultRouteHandlerMethod<{
  Params: Request.TParams;
  Reply: Reply.TFindOne;
}> = async function (request, reply) {
  const id = request.params.id;
  try {
    const entry = await this.prisma.entry.findUnique({
      where: {
        id,
      },
      rejectOnNotFound: true,
    });

    replyOK(reply, entry);
  } catch (e) {
    replyNotFound(reply, `Entry with id ${id} not found`);
  }
};

const updateOne: DefaultRouteHandlerMethod<{
  Params: Request.TParams;
  Body: Request.TUpdateOne;
  Reply: Reply.TUpdateOne;
}> = async function (request, reply) {
  const id = request.params.id;
  try {
    const entry = request.body;
    const updatedEntry = await this.prisma.entry.update({
      where: {
        id,
      },
      data: {
        description: entry.description,
        amount: entry.amount,
        date: entry.date,
        typeId: entry.typeId,
        accountId: entry.accountId,
        categoryId: entry.categoryId,
      },
    });

    replyOK(reply, updatedEntry);
  } catch (e) {
    replyNotFound(reply, `Entry with id ${id} not found`);
  }
};

const removeOne: DefaultRouteHandlerMethod<{
  Params: Request.TParams;
  Reply: Reply.TRemoveOne;
}> = async function (request, reply) {
  const id = request.params.id;
  try {
    const deletedEntry = await this.prisma.entry.delete({
      where: {
        id,
      },
    });

    replyOK(reply, deletedEntry);
  } catch (e) {
    replyNotFound(reply, `Entry with id ${id} not found`);
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
        params: Request.Params,
        body: Request.UpdateOne,
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
