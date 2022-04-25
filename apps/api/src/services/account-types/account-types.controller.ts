import { FastifyPluginAsync } from 'fastify';

import { Request, Reply } from 'schemas/account-types';

import {
  replyNotFound,
  replyOK,
} from '../../utils/response-builder';
import { DefaultRouteHandlerMethod } from '../../utils/types';

const findAll: DefaultRouteHandlerMethod<{
  Querystring: Request.TQuery;
}> = async function (request, reply) {
  const query = request.query;
  const allTypes = await this.prisma.accountType.findMany({
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
  replyOK(reply, allTypes);
};

const findOne: DefaultRouteHandlerMethod<{
  Params: Request.TParams;
}> = async function (request, reply) {
  const id = request.params.id;
  try {
    const type = await this.prisma.accountType.findUnique({
      where: {
        id,
      },
      rejectOnNotFound: true,
    });

    replyOK(reply, type);
  } catch (e) {
    replyNotFound(reply, `Type id ${id} was not found`);
  }
};

const controller: FastifyPluginAsync = async (fastify, options) => {
  fastify.get(
    '/',
    { schema: { querystring: Request.Query, response: Reply.AccountTypeArrayOK } },
    findAll
  );
  fastify.get(
    '/:id',
    { schema: { params: Request.Params, response: Reply.AccountTypeRecord } },
    findOne
  );
};

export default controller;
