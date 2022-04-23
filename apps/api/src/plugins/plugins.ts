import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

import { PrismaPlugin } from './prisma';

const services: FastifyPluginAsync = fp(async (fastify, options) => {
  fastify.register(PrismaPlugin);
});

export default services;
