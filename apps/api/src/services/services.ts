import { PrismaClient } from '@prisma/client';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

import accountTypes from './account-types';
import accounts from './accounts';
import categories from './categories';
import entries from './entries';

const services: FastifyPluginAsync = fp(async (fastify, options) => {
  fastify.register(accountTypes);
  fastify.register(accounts);
  fastify.register(categories);
  fastify.register(entries);
});

export default services;
