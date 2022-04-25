import { PrismaClient } from '@prisma/client';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

import accounts from './accounts';
import categories from './categories';
import entries from './entries';
import types from './types';

const services: FastifyPluginAsync = fp(async (fastify, options) => {
  fastify.register(accounts);
  fastify.register(categories);
  fastify.register(entries);
  fastify.register(types);
});

export default services;
