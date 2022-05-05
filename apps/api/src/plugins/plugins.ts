import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import cors from '@fastify/cors';

import { PrismaPlugin } from './prisma';

const services: FastifyPluginAsync = fp(async (fastify, options) => {
  fastify.register(cors, { origin: 'http://localhost:3000' });
  fastify.register(PrismaPlugin);
  fastify.log.info(__filename);
});

export default services;
