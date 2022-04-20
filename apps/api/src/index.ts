import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const server = fastify();

server.get('/ping', async (request, reply) => {
  return 'pong\n';
});

server.get('/entries', async (request, reply) => {
  const allEntries = await prisma.entry.findMany();
  reply.status(200).send(allEntries);
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
