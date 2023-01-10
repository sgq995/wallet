export interface IUpdateable<Entity, Result> {
  update(entity: Entity): Promise<Result>;
}
