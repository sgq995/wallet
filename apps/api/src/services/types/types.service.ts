import { FastifyPluginAsync } from 'fastify';

import controller from './types.controller';

const categories: FastifyPluginAsync = async (fastify, options) => {
  fastify.register(controller, { prefix: '/types' });
};

export default categories;
