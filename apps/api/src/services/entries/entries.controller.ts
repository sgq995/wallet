import { FastifyPluginAsync } from 'fastify';

import { Reply, Request } from 'schemas/entries';
import { getOrCreateProfileId } from '../../utils/profile-helper';

import {
  replyCreated,
  replyNotFound,
  replyOK,
} from '../../utils/response-builder';
import { DefaultRouteHandlerMethodWithSession } from '../../utils/types';
import { verifySessionHandler } from '../../utils/verify-session-handler';

const findAll: DefaultRouteHandlerMethodWithSession<{
  Querystring: Request.TQuery;
  Reply: Reply.TFindAll;
}> = async function (request, reply) {
  const query = request.query;
  const profileId = await getOrCreateProfileId(request.session!, this.prisma);
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
        profileId,
      },
    },
  });
  replyOK(reply, allEntries);
};

const addOne: DefaultRouteHandlerMethodWithSession<{
  Body: Request.TAddOne;
  Reply: Reply.TAddOne;
}> = async function (request, reply) {
  const entry = request.body;
  const profileId = await getOrCreateProfileId(request.session!, this.prisma);
  const createdEntry = await this.prisma.entry.create({
    data: {
      description: entry.description,
      amount: entry.amount,
      date: new Date(entry.date),
      typeId: entry.typeId,
      accountId: entry.accountId,
      categoryId: entry.categoryId,
      profileId,
    },
  });
  replyCreated(reply, createdEntry);
};

const findOne: DefaultRouteHandlerMethodWithSession<{
  Params: Request.TParams;
  Reply: Reply.TFindOne;
}> = async function (request, reply) {
  const id = request.params.id;
  const profileId = await getOrCreateProfileId(request.session!, this.prisma);
  try {
    const entry = await this.prisma.entry.findFirst({
      where: {
        AND: {
          id,
          profileId,
        },
      },
      rejectOnNotFound: true,
    });

    replyOK(reply, entry);
  } catch (e) {
    replyNotFound(reply, `Entry with id ${id} not found`);
  }
};

const updateOne: DefaultRouteHandlerMethodWithSession<{
  Params: Request.TParams;
  Body: Request.TUpdateOne;
  Reply: Reply.TUpdateOne;
}> = async function (request, reply) {
  const id = request.params.id;
  const profileId = await getOrCreateProfileId(request.session!, this.prisma);
  try {
    const entry = request.body;
    const updatedEntry = await this.prisma.entry.updateMany({
      where: {
        AND: {
          id,
          profileId,
        },
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

const removeOne: DefaultRouteHandlerMethodWithSession<{
  Params: Request.TParams;
  Reply: Reply.TRemoveOne;
}> = async function (request, reply) {
  const id = request.params.id;
  const profileId = await getOrCreateProfileId(request.session!, this.prisma);
  try {
    const deletedEntry = await this.prisma.entry.deleteMany({
      where: {
        AND: {
          id,
          profileId,
        },
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
        params: Request.Params,
        body: Request.UpdateOne,
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
