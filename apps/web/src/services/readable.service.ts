export interface IReadable<Entity, Result> {
  find(entity: Entity): Promise<Result>;
}
