import {
  Account,
  Category,
  Currency,
  Entry,
  EntryType,
  Prisma,
  PrismaClient,
  Profile,
  ProfilesCategories,
  Tag,
  Transaction,
} from '@prisma/client';

import fastify from 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

class PrismaDelegateMock {
  _data: any;

  constructor(data: any = {}) {
    this._data = data;
  }

  findUnique() {
    return this._data;
  }

  findMany() {
    return [this._data];
  }

  create() {
    return this._data;
  }
}

class PrismaClientMock extends PrismaClient {
  _profile = new PrismaDelegateMock();
  _currency = new PrismaDelegateMock();
  _transaction = new PrismaDelegateMock();
  _entry = new PrismaDelegateMock();
  _entryType = new PrismaDelegateMock();
  _account = new PrismaDelegateMock();
  _category = new PrismaDelegateMock();
  _profilesCategories = new PrismaDelegateMock();
  _tag = new PrismaDelegateMock();

  get profile(): Prisma.ProfileDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  > {
    return this._profile as any;
  }

  get currency(): Prisma.CurrencyDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  > {
    return this._currency as any;
  }

  get transaction(): Prisma.TransactionDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  > {
    return this._transaction as any;
  }

  get entry(): Prisma.EntryDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  > {
    return this._entry as any;
  }

  get entryType(): Prisma.EntryTypeDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  > {
    return this._entryType as any;
  }

  get account(): Prisma.AccountDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  > {
    return this._account as any;
  }

  get category(): Prisma.CategoryDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  > {
    return this._category as any;
  }

  get profilesCategories(): Prisma.ProfilesCategoriesDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  > {
    return this._profilesCategories as any;
  }

  get tag(): Prisma.TagDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  > {
    return this._tag as any;
  }

  async $connect() {}

  async $disconnect() {}
}

export const prismaMock = {
  '@prisma/client': { PrismaClient: PrismaClientMock },
};

interface ICreatePrismaMockArgs {
  profile?: Profile;
  currency?: Currency;
  transaction?: Transaction;
  entry?: Entry;
  entryType?: EntryType;
  account?: Account;
  category?: Category;
  profilesCategories?: ProfilesCategories;
  tag?: Tag;
}

export function createPrismaMock({
  profile,
  currency,
  transaction,
  entry,
  entryType,
  account,
  category,
  profilesCategories,
  tag,
}: ICreatePrismaMockArgs) {
  class WithDefaultPrismaClientMock extends PrismaClientMock {
    _profile: PrismaDelegateMock = new PrismaDelegateMock(profile);
    _currency = new PrismaDelegateMock(currency);
    _transaction = new PrismaDelegateMock(transaction);
    _entry = new PrismaDelegateMock(entry);
    _entryType = new PrismaDelegateMock(entryType);
    _account = new PrismaDelegateMock(account);
    _category = new PrismaDelegateMock(category);
    _profilesCategories = new PrismaDelegateMock(profilesCategories);
    _tag = new PrismaDelegateMock(tag);
  }

  return {
    '@prisma/client': { PrismaClient: WithDefaultPrismaClientMock },
  };
}