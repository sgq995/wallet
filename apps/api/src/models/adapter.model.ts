export interface IAdapter<
  A,
  R,
  AppModel extends A = A,
  RestModel extends R = R
> {
  modelToRest(entity: AppModel): RestModel;

  restToModel(entity: RestModel): AppModel;
}
