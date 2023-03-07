export interface IUpdateable<Params, Entity, Result> {
  update(params: Params, entity: Entity): Promise<Result>;
}
