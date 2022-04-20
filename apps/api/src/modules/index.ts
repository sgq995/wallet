import { FastifyPluginAsync } from 'fastify';

import { PrismaService } from '../services/prisma';
import entries from './entries';

const modules: FastifyPluginAsync = async (fastify, options) => {
  fastify.register(PrismaService, entries);
};

export default modules;
