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
        date: query.date ? new Date(query.date) : query.date,
        typeId: query.typeId,
        accountId: query.accountId,
        categoryId: query.categoryId,
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
  replyOK(reply, allEntries);
};

const addOne: DefaultRouteHandlerMethodWithSession<{
  Body: Request.TAddOne;
  Reply: Reply.TAddOne;
}> = async function (request, reply) {
  const entry = request.body;
  const transaction = entry.transaction;
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
      account: {
        connect: {
          id: entry.accountId ?? undefined,
        },
      },
      category: {
        connect: {
          id: entry.categoryId ?? undefined,
        },
      },
      tag: {
        connect: {
          id: entry.tagId ?? undefined,
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
      include: {
        transaction: {
          include: {
            currency: true,
          },
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
    await this.prisma.entry.findFirst({
      where: {
        AND: {
          id,
          profileId,
        },
      },
      rejectOnNotFound: true,
    });

    const entry = request.body;
    const transaction = entry.transaction;

    const updatedEntry = await this.prisma.entry.update({
      where: {
        id,
      },
      data: {
        description: entry.description,
        date: entry.date,
        transaction: {
          update: {
            units: transaction.units,
            cents: transaction.cents,
            currencyId: transaction.currencyId,
          },
        },
        type: {
          update: {
            id: entry.typeId,
          },
        },
        account: {
          update: {
            id: entry.accountId ?? undefined,
          },
          disconnect: entry.accountId === null,
        },
        category: {
          update: {
            id: entry.categoryId ?? undefined,
          },
          disconnect: entry.categoryId === null,
        },
        tag: {
          update: {
            id: entry.tagId ?? undefined,
          },
          disconnect: entry.tagId === null,
        },
      },
      include: {
        transaction: true,
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
    const foundEntry = await this.prisma.entry.findFirst({
      where: {
        AND: {
          id,
          profileId,
        },
      },
      rejectOnNotFound: true,
    });

    const deleteTransaction = this.prisma.transaction.delete({
      where: {
        id: foundEntry.transactionId,
      },
    });

    const deleteEntry = this.prisma.entry.delete({
      where: {
        id,
      },
      include: {
        transaction: true,
      },
    });

    const [_, deletedEntry] = await this.prisma.$transaction([
      deleteTransaction,
      deleteEntry,
    ]);

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
