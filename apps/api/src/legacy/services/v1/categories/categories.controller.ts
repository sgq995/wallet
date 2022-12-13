import { FastifyPluginAsync } from 'fastify';

import { Request, Reply } from 'schemas/categories';
import { to } from '../../../utils/promise-simplify';

import {
  replyCreated,
  replyNotFound,
  replyOK,
} from '../../../utils/response-builder';
import { DefaultRouteHandlerMethod } from '../../../utils/types';
import { verifySessionHandler } from '../../../utils/verify-session-handler';

const findAll: DefaultRouteHandlerMethod<{
  Querystring: Request.TQuery;
  Reply: Reply.TFindAll;
}> = async function (request, reply) {
  const query = request.query;
  const allCategories = await this.prisma.legacyCategory.findMany({
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
  await replyOK(reply, allCategories);
};

const addOne: DefaultRouteHandlerMethod<{
  Body: Request.TAddOne;
  Reply: Reply.TAddOne;
}> = async function (request, reply) {
  const legacyCategory = request.body;
  const createdCategory = await this.prisma.legacyCategory.create({
    data: {
      name: legacyCategory.name,
    },
  });
  await replyCreated(reply, createdCategory);
};

const findOne: DefaultRouteHandlerMethod<{
  Params: Request.TParams;
  Reply: Reply.TFindOne;
}> = async function (request, reply) {
  const id = request.params.id;

  const [legacyCategory, err] = await to(
    this.prisma.legacyCategory.findUnique({
      where: {
        id,
      },
      rejectOnNotFound: true,
    })
  );

  if (legacyCategory) {
    await replyOK(reply, legacyCategory);
  } else {
    this.log.error(err);
    await replyNotFound(reply, `Category id ${id} was not found`);
  }
};

const updateOne: DefaultRouteHandlerMethod<{
  Body: Request.TUpdateOne;
  Params: Request.TParams;
  Reply: Reply.TUpdateOne;
}> = async function (request, reply) {
  const id = request.params.id;
  const legacyCategory = request.body;

  const [updatedCategory, err] = await to(
    this.prisma.legacyCategory.update({
      where: {
        id,
      },
      data: {
        name: legacyCategory.name,
      },
    })
  );

  if (updatedCategory) {
    await replyOK(reply, updatedCategory);
  } else {
    this.log.error(err);
    await replyNotFound(reply, `Category id ${id} was not found`);
  }
};

const removeOne: DefaultRouteHandlerMethod<{
  Params: Request.TParams;
  Reply: Reply.TRemoveOne;
}> = async function (request, reply) {
  const id = request.params.id;

  const [deletedCategory, err] = await to(
    this.prisma.legacyCategory.delete({
      where: {
        id,
      },
    })
  );

  if (deletedCategory) {
    await replyOK(reply, deletedCategory);
  } else {
    this.log.error(err);
    await replyNotFound(reply, `Category id ${id} was not found`);
  }
};

const controller: FastifyPluginAsync = async (fastify) => {
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
