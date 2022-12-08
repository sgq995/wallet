import { FastifyPluginAsync } from 'fastify';

import controller from './accounts.controller';

const accounts: FastifyPluginAsync = async (fastify) => {
  await fastify.register(controller, { prefix: '/accounts' });
  fastify.log.info(__filename);
};

export default accounts;
