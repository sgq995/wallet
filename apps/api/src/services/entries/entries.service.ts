import { FastifyPluginAsync } from 'fastify';

import controller from './entries.controller';

const entries: FastifyPluginAsync = async (fastify, options) => {
  fastify.register(controller, { prefix: '/entries' });
};

export default entries;
