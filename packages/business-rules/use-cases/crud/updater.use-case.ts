import { IRepository } from '../models';
import { applyToMany } from './apply-to-many.helper';
import { applyToOne } from './apply-to-one.helper';

export class Updater<
  Entity,
  TEntity extends Entity,
  Repository extends IRepository<Entity, TEntity>
> {
  private update: Repository['update'];

  constructor(protected _repository: Repository) {
    this.update = this._repository.update.bind(this._repository);
  }

  updateOne(entity: Partial<TEntity>) {
    return applyToOne(this.update, entity);
  }

  updateMany(entities: Partial<TEntity>[]) {
    return applyToMany(this.update, entities);
  }
}
