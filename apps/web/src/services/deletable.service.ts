export interface IDeletable<Entity, Result> {
  remove(entity: Entity): Promise<Result>;
}
