import fastify, { FastifyInstance } from 'fastify';
import tap from 'tap';

import { createPrismaMock } from '../../../mocks/prisma.mock';
import { supertokensMock } from '../../../mocks/supertokens-node.mock';

let app: FastifyInstance;

const { PrismaPlugin } = tap.mock('../../../src/plugins/prisma', {
  ...createPrismaMock({
    profile: { id: 0, userId: '' },
    account: {
      balance: 0,
      createdAt: new Date(),
      currencyId: 0,
      id: 0,
      name: '',
      profileId: 0,
      updatedAt: new Date(),
    },
  }),
});

const AccountService = tap.mock('../../../src/services/accounts', {
  ...supertokensMock,
});

tap.before(async () => {
  app = fastify();
  await app.register(PrismaPlugin);
  await app.register(AccountService);
});

tap.test('should return the list of accounts', async () => {
  const response = await app.inject().get('/accounts');
  tap.equal(response.statusCode, 200);
  tap.equal(
    response.body,
    JSON.stringify({
      statusCode: 200,
      data: [{ id: 0, name: '', balance: 0, profileId: 0, currencyId: 0 }],
    })
  );
});
