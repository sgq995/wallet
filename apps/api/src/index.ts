import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

import modules from './modules';

const prisma = new PrismaClient();
const server = fastify();

server.register(modules);

server.get('/ping', async (request, reply) => {
  return 'pong\n';
});

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server listening at ${address}`);
});

server.addHook('onClose', async () => {
  await prisma.$disconnect();
})
