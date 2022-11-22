import { IRepository } from '../models';

export class Finder<
  Entity,
  TEntity extends Entity,
  Repository extends IRepository<Entity, TEntity>
> {
  constructor(protected _repository: Repository) {}

  match(): Promise<TEntity> {
    throw new Error('Not Implemented Yet');
  }
}
