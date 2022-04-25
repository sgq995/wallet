import { FastifyPluginAsync } from 'fastify';

import controller from './account-types.controller';

const categories: FastifyPluginAsync = async (fastify, options) => {
  fastify.register(controller, { prefix: '/account-types' });
};

export default categories;
