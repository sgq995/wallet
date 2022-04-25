import { FastifyPluginAsync } from 'fastify';

import { Request, Reply } from 'schemas/categories';

import {
  replyCreated,
  replyNotFound,
  replyOK,
} from '../../utils/response-builder';
import { DefaultRouteHandlerMethod } from '../../utils/types';

const findAll: DefaultRouteHandlerMethod<{
  Querystring: Request.TQuery;
}> = async function (request, reply) {
  const query = request.query;
  const allCategorys = await this.prisma.category.findMany({
    where: {
      AND: {
        id: query.id,
        name: query.name
          ? {
              contains: query.name,
            }
          : query.name,
      },
    },
  });
  replyOK(reply, allCategorys);
};

const addOne: DefaultRouteHandlerMethod<{
  Body: Request.TAddOne;
}> = async function (request, reply) {
  const category = request.body;
  const createdCategory = await this.prisma.category.create({
    data: {
      name: category.name,
    },
  });
  replyCreated(reply, createdCategory);
};

const findOne: DefaultRouteHandlerMethod<{
  Params: Request.TParams;
}> = async function (request, reply) {
  const id = request.params.id;
  try {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
      rejectOnNotFound: true,
    });

    replyOK(reply, category);
  } catch (e) {
    replyNotFound(reply, `Category id ${id} was not found`);
  }
};

const updateOne: DefaultRouteHandlerMethod<{
  Body: Request.TUpdateOne;
  Params: Request.TParams;
}> = async function (request, reply) {
  const id = request.params.id;
  const category = request.body;
  try {
    const updatedCategory = await this.prisma.category.update({
      where: {
        id,
      },
      data: {
        name: category.name,
      },
    });

    replyOK(reply, updatedCategory);
  } catch (e) {
    replyNotFound(reply, `Category id ${id} was not found`);
  }
};

const removeOne: DefaultRouteHandlerMethod<{
  Params: Request.TParams;
}> = async function (request, reply) {
  const id = request.params.id;
  try {
    const deletedCategory = await this.prisma.category.delete({
      where: {
        id,
      },
    });

    replyOK(reply, deletedCategory);
  } catch (e) {
    replyNotFound(reply, `Category id ${id} was not found`);
  }
};

const controller: FastifyPluginAsync = async (fastify, options) => {
  fastify.get(
    '/',
    { schema: { querystring: Request.Query, response: Reply.CategoryArrayOK } },
    findAll
  );
  fastify.post(
    '/',
    { schema: { body: Request.AddOne, response: Reply.CategoryCreated } },
    addOne
  );
  fastify.get(
    '/:id',
    { schema: { params: Request.Params, response: Reply.CategoryRecord } },
    findOne
  );
  fastify.put(
    '/:id',
    {
      schema: {
        body: Request.UpdateOne,
        params: Request.Params,
        response: Reply.CategoryRecord,
      },
    },
    updateOne
  );
  fastify.delete(
    '/:id',
    { schema: { params: Request.Params, response: Reply.CategoryRecord } },
    removeOne
  );
};

export default controller;
