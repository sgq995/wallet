import { FastifyPluginAsync } from 'fastify';

import { Request, Reply } from 'schemas/categories';

import {
  replyCreated,
  replyNotFound,
  replyOK,
} from '../../utils/response-builder';
import { DefaultRouteHandlerMethod } from '../../utils/types';
import { verifySessionHandler } from '../../utils/verify-session-handler';

const findAll: DefaultRouteHandlerMethod<{
  Querystring: Request.TQuery;
  Reply: Reply.TFindAll;
}> = async function (request, reply) {
  const query = request.query;
  const allCategories = await this.prisma.category.findMany({
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
  replyOK(reply, allCategories);
};

const addOne: DefaultRouteHandlerMethod<{
  Body: Request.TAddOne;
  Reply: Reply.TAddOne;
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
  Reply: Reply.TFindOne;
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
    this.log.error(e);
    replyNotFound(reply, `Category id ${id} was not found`);
  }
};

const updateOne: DefaultRouteHandlerMethod<{
  Body: Request.TUpdateOne;
  Params: Request.TParams;
  Reply: Reply.TUpdateOne;
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
    this.log.error(e);
    replyNotFound(reply, `Category id ${id} was not found`);
  }
};

const removeOne: DefaultRouteHandlerMethod<{
  Params: Request.TParams;
  Reply: Reply.TRemoveOne;
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
    this.log.error(e);
    replyNotFound(reply, `Category id ${id} was not found`);
  }
};

const controller: FastifyPluginAsync = async (fastify, options) => {
  fastify.get(
    '/',
    {
      schema: { querystring: Request.Query, response: Reply.FindAll },
      preHandler: verifySessionHandler(),
    },
    findAll
  );
  fastify.post(
    '/',
    {
      schema: { body: Request.AddOne, response: Reply.AddOne },
      preHandler: verifySessionHandler(),
    },
    addOne
  );
  fastify.get(
    '/:id',
    {
      schema: { params: Request.Params, response: Reply.FindOne },
      preHandler: verifySessionHandler(),
    },
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
      preHandler: verifySessionHandler(),
    },
    updateOne
  );
  fastify.delete(
    '/:id',
    {
      schema: { params: Request.Params, response: Reply.RemoveOne },
      preHandler: verifySessionHandler(),
    },
    removeOne
  );
};

export default controller;
