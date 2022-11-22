import { IRepository } from '../models';

export class Updater<
  Entity,
  TEntity extends Entity,
  Repository extends IRepository<Entity, TEntity>
> {
  constructor(protected _repository: Repository) {}
}
