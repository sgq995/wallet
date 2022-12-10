import { FastifyPluginAsync } from 'fastify';

import controller from './categories.controller';

const categories: FastifyPluginAsync = async (fastify) => {
  await fastify.register(controller, { prefix: '/categories' });
  fastify.log.info(__filename);
};

export default categories;
