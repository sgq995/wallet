import { IRepository } from '../models/repository.model';

export class Creator<
  Entity,
  TEntity extends Entity,
  Repository extends IRepository<Entity, TEntity>
> {
  constructor(protected _repository: Repository) {}

  async createOne(account: TEntity): Promise<TEntity> {
    try {
      const result = await this._repository.create(account);
      if (Array.isArray(result)) {
        return result[0];
      }
      return result;
    } catch (e) {
      throw e;
    }
  }

  async createMany(accounts: TEntity[]): Promise<TEntity[]> {
    try {
      const result = await this._repository.create(accounts);
      if (Array.isArray(result)) {
        return result;
      }
      return [result];
    } catch (e) {
      throw e;
    }
  }
}
