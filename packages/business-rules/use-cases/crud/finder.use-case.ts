import { IRepository } from '../models';
import { applyToMany } from './apply-to-many.helper';
import { applyToOne } from './apply-to-one.helper';

export class Finder<
  Entity,
  TEntity extends Entity,
  Repository extends IRepository<Entity, TEntity>
> {
  private find: Repository['find'];

  constructor(protected _repository: Repository) {
    this.find = this._repository.find.bind(this._repository);
  }

  async findOne(entity: Partial<TEntity>): Promise<TEntity> {
    return applyToOne(this.find, entity);
  }

  async findMany(entities: Partial<TEntity>[]): Promise<TEntity[]> {
    return applyToMany(this.find, entities);
  }
}
