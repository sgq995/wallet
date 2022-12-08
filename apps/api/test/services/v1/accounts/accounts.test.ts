import fastify, { FastifyInstance } from 'fastify';
import tap from 'tap';

import { createPrismaMock } from '../../../../mocks/prisma.mock';
import { supertokensMock } from '../../../../mocks/supertokens-node.mock';

let app: FastifyInstance;

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const { PrismaPlugin } = tap.mock('../../../../src/plugins/prisma', {
  ...createPrismaMock({
    profile: { id: 0, userId: '' },
    account: {
      transactionId: 0,
      // balance: 0,
      createdAt: new Date(),
      // currencyId: 0,
      id: 0,
      name: '',
      profileId: 0,
      updatedAt: new Date(),
    },
  }),
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const AccountService = tap.mock('../../../../src/services/v1/accounts', {
  ...supertokensMock,
});

tap.before(async () => {
  app = fastify();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  await app.register(PrismaPlugin);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  await app.register(AccountService);
});

void tap.test('should return the list of accounts', async () => {
  const response = await app.inject().get('/accounts');
  tap.equal(response.statusCode, 200, 'status code');
  tap.equal(
    response.body,
    JSON.stringify({
      statusCode: 200,
      data: [{ id: 0, name: '', transactionId: 0 }],
    }),
    'body'
  );
});
