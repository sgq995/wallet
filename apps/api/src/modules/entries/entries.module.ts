import { FastifyPluginAsync } from 'fastify';

import controller from './entries.controller';

const module: FastifyPluginAsync = async (fastify, options) => {
  fastify.register(controller, { prefix: '/entries' });
};

export default module;
