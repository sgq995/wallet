import { PrismaClient } from '@prisma/client';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

import accounts from './accounts';
import entries from './entries';

const services: FastifyPluginAsync = fp(async (fastify, options) => {
  // fastify.register(entries);
  fastify.register(accounts);
});

export default services;
