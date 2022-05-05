import { PrismaClient } from '@prisma/client';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

import accountTypes from './account-types';
import accounts from './accounts';
import categories from './categories';
import entries from './entries';

const services: FastifyPluginAsync = fp(async (fastify, options) => {
  const prefix = '/v1';
  fastify.register(accountTypes, { ...options, prefix: prefix });
  fastify.register(accounts, { ...options, prefix: prefix });
  fastify.register(categories, { ...options, prefix: prefix });
  fastify.register(entries, { ...options, prefix: prefix });
  fastify.log.info(__filename);
});

export default services;
