export interface IRepository<Entity, TEntity extends Entity> {
  create(account: TEntity | TEntity[]): Promise<TEntity | TEntity[]>;

  find(account: Partial<TEntity | TEntity[]>): Promise<TEntity | TEntity[]>;

  update(account: Partial<TEntity | TEntity[]>): Promise<TEntity | TEntity[]>;

  remove(account: Partial<TEntity | TEntity[]>): Promise<TEntity | TEntity[]>;
}
