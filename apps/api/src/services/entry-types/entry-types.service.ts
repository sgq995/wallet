import { FastifyPluginAsync } from 'fastify';

import controller from './entry-types.controller';

const categories: FastifyPluginAsync = async (fastify) => {
  await fastify.register(controller, { prefix: '/entry-types' });
  fastify.log.info(__filename);
};

export default categories;
