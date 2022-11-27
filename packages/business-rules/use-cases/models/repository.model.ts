export interface IRepository<Entity, TEntity extends Entity> {
  create(entity: TEntity | TEntity[]): Promise<TEntity | TEntity[]>;

  find(
    entity: Partial<TEntity> | Partial<TEntity>[]
  ): Promise<TEntity | TEntity[]>;

  update(
    entity: Partial<TEntity> | Partial<TEntity>[]
  ): Promise<TEntity | TEntity[]>;

  remove(
    entity: Partial<TEntity> | Partial<TEntity>[]
  ): Promise<TEntity | TEntity[]>;
}
