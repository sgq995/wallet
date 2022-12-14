import { PrismaClient } from '@prisma/client';
import { AsyncAppModule } from '../models/module.model';

export class PrismaModule extends AsyncAppModule {
  private _prisma: PrismaClient;

  constructor() {
    super();
    this._prisma = new PrismaClient();
  }

  static provides(): unknown[] {
    return [PrismaClient];
  }

  definitions(): unknown[] {
    return [this._prisma];
  }

  async init(): Promise<void> {
    await this._prisma.$connect();
  }

  async destroy(): Promise<void> {
    await this._prisma.$disconnect();
  }
}
