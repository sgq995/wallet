import {
  FastifyPluginAsync,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandlerMethod,
} from 'fastify';

import { Reply, Request } from 'schemas/entries';

const findAll: RouteHandlerMethod = async function (request, reply) {
  const allEntries = await this.prisma.entry.findMany();
  reply.status(200).send(allEntries);
};

const addOne: RouteHandlerMethod<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  { Body: Request.TAddOne }
> = async function (request, reply) {
  const entry = request.body;
  const createdEntry = await this.prisma.entry.create({
    data: {
      description: entry.description,
      amount: entry.amount,
      date: new Date(entry.date),
      typeId: entry.typeId,
      accountId: entry.accountId,
      categoryId: entry.categoryId,
    },
  });
  reply.status(201).send(createdEntry);
};

const controller: FastifyPluginAsync = async (fastify, options) => {
  fastify.get('/', { schema: { response: Reply.FindAll } }, findAll);
  fastify.post(
    '/',
    { schema: { body: Request.AddOne, response: Reply.AddOne } },
    addOne
  );
};

export default controller;
