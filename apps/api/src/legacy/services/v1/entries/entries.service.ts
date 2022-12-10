import { FastifyPluginAsync } from 'fastify';

import controller from './entries.controller';

const entries: FastifyPluginAsync = async (fastify) => {
  await fastify.register(controller, { prefix: '/entries' });
  fastify.log.info(__filename);
};

export default entries;
