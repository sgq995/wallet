export interface ICreateable<Entity, Result> {
  add(entity: Entity): Promise<Result>;
}
