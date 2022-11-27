import { IRepository } from '../models';
import { applyToMany } from './apply-to-many.helper';
import { applyToOne } from './apply-to-one.helper';

export class Remover<
  Entity,
  TEntity extends Entity,
  Repository extends IRepository<Entity, TEntity>
> {
  private remove: Repository['remove'];

  constructor(protected _repository: Repository) {
    this.remove = this._repository.remove.bind(this._repository);
  }

  removeOne(entity: Partial<TEntity>) {
    return applyToOne(this.remove, entity);
  }

  removeMany(entities: Partial<TEntity>[]) {
    return applyToMany(this.remove, entities);
  }
}
