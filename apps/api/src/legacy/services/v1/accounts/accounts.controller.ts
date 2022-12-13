import { FastifyPluginAsync } from 'fastify';

import { Request, Reply } from 'schemas/accounts';
import { getOrCreateProfileId } from '../../../utils/profile-helper';
import { to } from '../../../utils/promise-simplify';

import {
  replyCreated,
  replyNotFound,
  replyOK,
} from '../../../utils/response-builder';
import { DefaultRouteHandlerMethodWithSession } from '../../../utils/types';
import { verifySessionHandler } from '../../../utils/verify-session-handler';

// TODO: Move this to configuration
const MAX_ALLOWED_TAKE = 10;

const findAll: DefaultRouteHandlerMethodWithSession<{
  Querystring: Request.TQuery;
  Reply: Reply.TFindAll;
}> = async function (request, reply) {
  const query = request.query;
  const take = Math.min(
    request.query.take ?? MAX_ALLOWED_TAKE,
    MAX_ALLOWED_TAKE
  );
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const profileId = await getOrCreateProfileId(request.session!, this.prisma);
  const allAccounts = await this.prisma.legacyAccount.findMany({
    skip: query.skip,
    take: take,
    where: {
      AND: {
        id: query.id,
        name: query.name
          ? {
              contains: query.name,
            }
          : query.name,
        profileId,
      },
    },
    include: {
      transaction: {
        include: {
          currency: true,
        },
      },
    },
  });
  await replyOK(reply, allAccounts);
};

const addOne: DefaultRouteHandlerMethodWithSession<{
  Body: Request.TAddOne;
  Reply: Reply.TAddOne;
}> = async function (request, reply) {
  const legacyAccount = request.body;
  const transaction = legacyAccount.transaction;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const profileId = await getOrCreateProfileId(request.session!, this.prisma);
  const createdAccount = await this.prisma.legacyAccount.create({
    data: {
      name: legacyAccount.name,
      transaction: {
        create: {
          units: transaction.units,
          cents: transaction.cents,
          currencyId: transaction.currencyId,
        },
      },
      profile: {
        connect: {
          id: profileId,
        },
      },
    },
    include: {
      transaction: {
        include: {
          currency: true,
        },
      },
    },
  });
  await replyCreated(reply, createdAccount);
};

const findOne: DefaultRouteHandlerMethodWithSession<{
  Params: Request.TParams;
  Reply: Reply.TFindOne;
}> = async function (request, reply) {
  const id = request.params.id;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const profileId = await getOrCreateProfileId(request.session!, this.prisma);

  const [legacyAccount, err] = await to(
    this.prisma.legacyAccount.findFirst({
      where: {
        AND: {
          id,
          profileId,
        },
      },
      include: {
        transaction: {
          include: {
            currency: true,
          },
        },
      },
      rejectOnNotFound: true,
    })
  );

  if (legacyAccount) {
    await replyOK(reply, legacyAccount);
  } else {
    this.log.error(err);
    await replyNotFound(reply, `Account id ${id} was not found`);
  }
};

const updateOne: DefaultRouteHandlerMethodWithSession<{
  Body: Request.TUpdateOne;
  Params: Request.TParams;
  Reply: Reply.TUpdateOne;
}> = async function (request, reply) {
  const id = request.params.id;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const profileId = await getOrCreateProfileId(request.session!, this.prisma);

  let data, err;

  [data, err] = await to(
    this.prisma.legacyAccount.findFirst({
      where: {
        AND: {
          id,
          profileId,
        },
      },
      rejectOnNotFound: true,
    })
  );

  if (!err) {
    const legacyAccount = request.body;
    const transaction = legacyAccount.transaction;

    [data, err] = await to(
      this.prisma.legacyAccount.update({
        where: {
          id,
        },
        data: {
          name: legacyAccount.name,
          ...(transaction
            ? {
                transaction: {
                  update: {
                    units: transaction?.units,
                    cents: transaction?.cents,
                    currencyId: transaction?.currencyId,
                  },
                },
              }
            : undefined),
        },
        include: {
          transaction: true,
        },
      })
    );
  }

  if (!err) {
    await replyOK(reply, data);
  } else {
    this.log.error(err);
    await replyNotFound(reply, `Account id ${id} was not found`);
  }
};

const removeOne: DefaultRouteHandlerMethodWithSession<{
  Params: Request.TParams;
  Reply: Reply.TRemoveOne;
}> = async function (request, reply) {
  const id = request.params.id;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const profileId = await getOrCreateProfileId(request.session!, this.prisma);

  let data, err;

  [data, err] = await to(
    this.prisma.legacyAccount.findFirst({
      where: {
        AND: {
          id,
          profileId,
        },
      },
      rejectOnNotFound: true,
    })
  );

  if (!err) {
    [data, err] = await to(
      this.prisma.legacyAccount.delete({
        where: {
          id,
        },
      })
    );
  }

  if (!err) {
    await replyOK(reply, data);
  } else {
    this.log.error(err);
    await replyNotFound(reply, `Account id ${id} was not found`);
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
