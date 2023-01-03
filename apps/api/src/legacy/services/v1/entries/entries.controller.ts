import { Entry } from '@prisma/client';
import { FastifyPluginAsync } from 'fastify';

import { Reply, Request } from '@wallet/schemas/entries';
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
const MAX_ALLOWED_TAKE = 25;

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
  const allEntries = await this.prisma.entry.findMany({
    skip: query.skip,
    take: take,
    where: {
      AND: {
        id: query.id,
        description: query.description
          ? {
              contains: query.description,
            }
          : query.description,
        date: query.date ? new Date(query.date) : query.date,
        typeId: query.typeId,
        accountId: query.accountId,
        categoryId: query.categoryId,
        profileId,
        ...(query.cursor
          ? { [query.cursor.key]: query.cursor.value as never }
          : undefined),
      },
    },
    ...(query.sort
      ? {
          orderBy: {
            [query.sort]: query.desc ? 'desc' : 'asc',
          },
        }
      : undefined),
    include: {
      transaction: {
        include: {
          currency: true,
        },
      },
    },
  });
  await replyOK(reply, allEntries);
};

const addOne: DefaultRouteHandlerMethodWithSession<{
  Body: Request.TAddOne;
  Reply: Reply.TAddOne;
}> = async function (request, reply) {
  const entry = request.body;
  const transaction = entry.transaction;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const profileId = await getOrCreateProfileId(request.session!, this.prisma);
  const createdEntry = await this.prisma.entry.create({
    data: {
      description: entry.description,
      transaction: {
        create: {
          units: transaction.units,
          cents: transaction.cents,
          currencyId: transaction.currencyId,
        },
      },
      date: new Date(entry.date),
      type: {
        connect: {
          id: entry.typeId,
        },
      },
      ...(entry.accountId
        ? {
            account: {
              connect: { id: entry.accountId },
            },
          }
        : undefined),
      ...(entry.categoryId
        ? {
            category: {
              connect: { id: entry.categoryId },
            },
          }
        : undefined),
      ...(entry.tagId
        ? {
            tag: {
              connect: { id: entry.tagId },
            },
          }
        : undefined),
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
  await replyCreated(reply, createdEntry);
};

const findOne: DefaultRouteHandlerMethodWithSession<{
  Params: Request.TParams;
  Reply: Reply.TFindOne;
}> = async function (request, reply) {
  const id = request.params.id;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const profileId = await getOrCreateProfileId(request.session!, this.prisma);

  const [entry, err] = await to(
    this.prisma.entry.findFirst({
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

  if (entry) {
    await replyOK(reply, entry);
  } else {
    this.log.error(err);
    await replyNotFound(reply, `Entry with id ${id} not found`);
  }
};

const updateOne: DefaultRouteHandlerMethodWithSession<{
  Params: Request.TParams;
  Body: Request.TUpdateOne;
  Reply: Reply.TUpdateOne;
}> = async function (request, reply) {
  const id = request.params.id;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const profileId = await getOrCreateProfileId(request.session!, this.prisma);

  let data, err;

  [data, err] = await to(
    this.prisma.entry.findFirst({
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
    const entry = request.body;
    const transaction = entry.transaction;

    [data, err] = await to(
      this.prisma.entry.update({
        where: {
          id,
        },
        data: {
          description: entry.description,
          date: entry.date ? new Date(entry.date) : undefined,
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
          ...(entry.typeId
            ? {
                type: {
                  update: {
                    id: entry.typeId,
                  },
                },
              }
            : undefined),
          account: {
            ...(entry.accountId
              ? {
                  update: {
                    id: entry.accountId,
                  },
                }
              : {
                  disconnect: entry.accountId === null,
                }),
          },
          category: {
            ...(entry.categoryId
              ? {
                  update: {
                    id: entry.categoryId,
                  },
                }
              : {
                  disconnect: entry.categoryId === null,
                }),
          },
          tag: {
            ...(entry.tagId
              ? {
                  update: {
                    id: entry.tagId,
                  },
                }
              : {
                  disconnect: entry.tagId === null,
                }),
          },
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
    await replyNotFound(reply, `Entry with id ${id} not found`);
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
    this.prisma.entry.findFirst({
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
    const deleteEntry = this.prisma.entry.delete({
      where: {
        id,
      },
      include: {
        transaction: true,
      },
    });

    const deleteTransaction = this.prisma.legacyTransaction.delete({
      where: {
        id: (data as unknown as Entry).transactionId,
      },
    });

    const [deletedEntry, deleteError] = await to(
      this.prisma.$transaction([deleteEntry, deleteTransaction])
    );

    data = deletedEntry?.[0];
    err = deleteError;
  }

  if (!err) {
    await replyOK(reply, data);
  } else {
    this.log.error(err);
    await replyNotFound(reply, `Entry with id ${id} not found`);
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
