import { FastifyPluginAsync, RouteHandlerMethod } from 'fastify';

const findAll: RouteHandlerMethod = async function (request, reply) {
  const allEntries = await this.prisma.entry.findMany();
  reply.status(200).send(allEntries);
};

const controller: FastifyPluginAsync = async (fastify, options) => {
  fastify.get('/', findAll);
};

export default controller;
