import { FastifyPluginAsync } from 'fastify';

import controller from './currencies.controller';

const currencies: FastifyPluginAsync = async (fastify, options) => {
  fastify.register(controller, { prefix: '/currencies' });
  fastify.log.info(__filename);
};

export default currencies;
