import { App } from './app';
import { FastifyFramework } from './fastify.framework';

const fastify = new FastifyFramework();
const app = new App(fastify);

void (async function main() {
  await app.start();
  await fastify.listen();
})();
