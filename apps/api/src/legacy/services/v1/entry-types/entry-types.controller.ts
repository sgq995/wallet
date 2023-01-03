import { FastifyPluginAsync } from 'fastify';

import { Request, Reply } from '@wallet/schemas/entry-types';
import { to } from '../../../utils/promise-simplify';

import { replyNotFound, replyOK } from '../../../utils/response-builder';
import { DefaultRouteHandlerMethod } from '../../../utils/types';
import { verifySessionHandler } from '../../../utils/verify-session-handler';

const findAll: DefaultRouteHandlerMethod<{
  Querystring: Request.TQuery;
  Reply: Reply.TFindAll;
}> = async function (request, reply) {
  const query = request.query;
  const allTypes = await this.prisma.entryType.findMany({
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
  await replyOK(reply, allTypes);
};

const findOne: DefaultRouteHandlerMethod<{
  Params: Request.TParams;
  Reply: Reply.TFindOne;
}> = async function (request, reply) {
  const id = request.params.id;

  const [type, err] = await to(
    this.prisma.entryType.findUnique({
      where: {
        id,
      },
      rejectOnNotFound: true,
    })
  );

  if (type) {
    await replyOK(reply, type);
  } else {
    this.log.error(err);
    await replyNotFound(reply, `Type id ${id} was not found`);
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
  fastify.get(
    '/:id',
    {
      schema: { params: Request.Params, response: Reply.FindOne },
      preHandler: verifySessionHandler(),
    },
    findOne
  );
};

export default controller;
