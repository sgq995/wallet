import { FastifyPluginAsync } from 'fastify';

import controller from './accounts.controller';

const accounts: FastifyPluginAsync = async (fastify, options) => {
  fastify.register(controller, { prefix: '/accounts' });
};

export default accounts;
