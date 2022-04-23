import { PrismaClient } from '@prisma/client';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

import entries from './entries';

const services: FastifyPluginAsync = fp(async (fastify, options) => {
  fastify.register(entries);
});

export default services;
