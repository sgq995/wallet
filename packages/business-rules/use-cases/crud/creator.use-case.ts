import { IRepository } from '../models/repository.model';
import { applyToMany } from './apply-to-many.helper';
import { applyToOne } from './apply-to-one.helper';

export class Creator<
  Entity,
  TEntity extends Entity,
  Repository extends IRepository<Entity, TEntity>
> {
  private create: Repository['create'];

  constructor(protected _repository: Repository) {
    this.create = this._repository.create.bind(this._repository);
  }

  async createOne(entity: TEntity): Promise<TEntity> {
    return applyToOne(this.create, entity);
  }

  async createMany(entities: TEntity[]): Promise<TEntity[]> {
    return applyToMany(this.create, entities);
  }
}
