import { FastifyPluginAsync } from 'fastify';

import { Request, Reply } from 'schemas/accounts';
import { getOrCreateProfileId } from '../../utils/profile-helper';

import {
  replyCreated,
  replyNotFound,
  replyOK,
} from '../../utils/response-builder';
import {
  DefaultRouteHandlerMethod,
  DefaultRouteHandlerMethodWithSession,
} from '../../utils/types';
import { verifySessionHandler } from '../../utils/verify-session-handler';

const findAll: DefaultRouteHandlerMethodWithSession<{
  Querystring: Request.TQuery;
  Reply: Reply.TFindAll;
}> = async function (request, reply) {
  const query = request.query;
  const profileId = await getOrCreateProfileId(request.session!, this.prisma);
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
        profileId,
      },
    },
  });
  replyOK(reply, allAccounts);
};

const addOne: DefaultRouteHandlerMethodWithSession<{
  Body: Request.TAddOne;
  Reply: Reply.TAddOne;
}> = async function (request, reply) {
  const account = request.body;
  const profileId = await getOrCreateProfileId(request.session!, this.prisma);
  const createdAccount = await this.prisma.account.create({
    data: {
      name: account.name,
      balance: account.balance,
      profileId,
    },
  });
  replyCreated(reply, createdAccount);
};

const findOne: DefaultRouteHandlerMethodWithSession<{
  Params: Request.TParams;
  Reply: Reply.TFindOne;
}> = async function (request, reply) {
  const id = request.params.id;
  const profileId = await getOrCreateProfileId(request.session!, this.prisma);
  try {
    const account = await this.prisma.account.findFirst({
      where: {
        AND: {
          id,
          profileId,
        },
      },
      rejectOnNotFound: true,
    });

    replyOK(reply, account);
  } catch (e) {
    replyNotFound(reply, `Account id ${id} was not found`);
  }
};

const updateOne: DefaultRouteHandlerMethodWithSession<{
  Body: Request.TUpdateOne;
  Params: Request.TParams;
  Reply: Reply.TUpdateOne;
}> = async function (request, reply) {
  const id = request.params.id;
  const account = request.body;
  const profileId = await getOrCreateProfileId(request.session!, this.prisma);
  try {
    const updatedAccount = await this.prisma.account.updateMany({
      where: {
        AND: {
          id,
          profileId,
        },
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

const removeOne: DefaultRouteHandlerMethodWithSession<{
  Params: Request.TParams;
  Reply: Reply.TRemoveOne;
}> = async function (request, reply) {
  const id = request.params.id;
  const profileId = await getOrCreateProfileId(request.session!, this.prisma);
  try {
    const deletedAccount = await this.prisma.account.deleteMany({
      where: {
        AND: {
          id,
          profileId,
        },
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
