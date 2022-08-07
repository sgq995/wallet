import fastify, { FastifyPluginAsync } from 'fastify';

import { Request, Reply } from 'schemas/currencies';
import { to } from '../../utils/promise-simplify';

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
  const allCurrencies = await this.prisma.currency.findMany({
    where: {
      AND: {
        id: query.id,
        precision: query.precision,
        symbol: query.symbol
          ? {
              contains: query.symbol,
            }
          : query.symbol,
        code: query.code,
        decimal: query.decimal,
        separator: query.separator,
      },
    },
  });
  await replyOK(reply, allCurrencies);
};

const addOne: DefaultRouteHandlerMethod<{
  Body: Request.TAddOne;
  Reply: Reply.TAddOne;
}> = async function (request, reply) {
  const currency = request.body;
  const createdCurrency = await this.prisma.currency.create({
    data: {
      precision: currency.precision,
      symbol: currency.symbol,
      code: currency.code,
      decimal: currency.decimal,
      separator: currency.separator,
    },
  });
  await replyCreated(reply, createdCurrency);
};

const findOne: DefaultRouteHandlerMethod<{
  Params: Request.TParams;
  Reply: Reply.TFindOne;
}> = async function (request, reply) {
  const id = request.params.id;

  const [currency, err] = await to(
    this.prisma.currency.findUnique({
      where: {
        id,
      },
      rejectOnNotFound: true,
    })
  );

  if (currency) {
    await replyOK(reply, currency);
  } else {
    this.log.error(err);
    await replyNotFound(reply, `Currency id ${id} was not found`);
  }
};

const updateOne: DefaultRouteHandlerMethod<{
  Body: Request.TUpdateOne;
  Params: Request.TParams;
  Reply: Reply.TUpdateOne;
}> = async function (request, reply) {
  const id = request.params.id;
  const currency = request.body;

  const [updatedCurrency, err] = await to(
    this.prisma.currency.update({
      where: {
        id,
      },
      data: {
        precision: currency.precision,
        symbol: currency.symbol,
        code: currency.code,
        decimal: currency.decimal,
        separator: currency.separator,
      },
    })
  );

  if (updatedCurrency) {
    await replyOK(reply, updatedCurrency);
  } else {
    this.log.error(err);
    await replyNotFound(reply, `Currency id ${id} was not found`);
  }
};

const removeOne: DefaultRouteHandlerMethod<{
  Params: Request.TParams;
  Reply: Reply.TRemoveOne;
}> = async function (request, reply) {
  const id = request.params.id;

  const [deletedCurrency, err] = await to(
    this.prisma.currency.delete({
      where: {
        id,
      },
    })
  );

  if (deletedCurrency) {
    await replyOK(reply, deletedCurrency);
  } else {
    this.log.error(err);
    await replyNotFound(reply, `Currency id ${id} was not found`);
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
  // fastify.post(
  //   '/',
  //   {
  //     schema: { body: Request.AddOne, response: Reply.AddOne },
  //     preHandler: verifySessionHandler(),
  //   },
  //   addOne
  // );
  fastify.get(
    '/:id',
    {
      schema: { params: Request.Params, response: Reply.FindOne },
      preHandler: verifySessionHandler(),
    },
    findOne
  );
  // fastify.put(
  //   '/:id',
  //   {
  //     schema: {
  //       body: Request.UpdateOne,
  //       params: Request.Params,
  //       response: Reply.UpdateOne,
  //     },
  //     preHandler: verifySessionHandler(),
  //   },
  //   updateOne
  // );
  // fastify.delete(
  //   '/:id',
  //   {
  //     schema: { params: Request.Params, response: Reply.RemoveOne },
  //     preHandler: verifySessionHandler(),
  //   },
  //   removeOne
  // );
};

export default controller;
