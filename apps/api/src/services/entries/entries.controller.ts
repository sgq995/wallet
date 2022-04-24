import { FastifyPluginAsync, RouteHandlerMethod } from 'fastify';

import { Reply, Request } from 'schemas/entries';

import {
  replyCreated,
  replyNotFound,
  replyOK,
} from '../../utils/response-builder';
import { DefaultRouteHandlerMethod } from '../../utils/types';

const findAll: DefaultRouteHandlerMethod<{
  Querystring: Request.TQuery;
}> = async function (request, reply) {
  const allEntries = await this.prisma.entry.findMany();
  replyOK(reply, allEntries);
};

const addOne: DefaultRouteHandlerMethod<{
  Body: Request.TAddOne;
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
  fastify.get('/', { schema: { response: Reply.EntryArrayOK } }, findAll);
  fastify.post(
    '/',
    { schema: { body: Request.AddOne, response: Reply.EntryCreated } },
    addOne
  );
  fastify.get(
    '/:id',
    { schema: { params: Request.Params, response: Reply.EntryRecord } },
    findOne
  );
  fastify.put(
    '/:id',
    {
      schema: {
        params: Request.Params,
        body: Request.UpdateOne,
        response: Reply.EntryRecord,
      },
    },
    updateOne
  );
  fastify.delete(
    '/:id',
    { schema: { params: Request.Params, response: Reply.EntryRecord } },
    removeOne
  );
};

export default controller;
