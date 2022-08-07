import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

import entryTypes from './entry-types';
import accounts from './accounts';
import categories from './categories';
import entries from './entries';
import currencies from './currencies';

const services: FastifyPluginAsync = fp(async (fastify, options) => {
  const prefix = '/v1';
  await fastify.register(entryTypes, { ...options, prefix: prefix });
  await fastify.register(accounts, { ...options, prefix: prefix });
  await fastify.register(categories, { ...options, prefix: prefix });
  await fastify.register(entries, { ...options, prefix: prefix });
  await fastify.register(currencies, { ...options, prefix: prefix });
  fastify.log.info(__filename);
});

export default services;
