export interface IAdapter<StoreModel, AppModel, RestModel> {
  modelToStore(entity: AppModel): StoreModel;

  storeToModel(entity: StoreModel): AppModel;

  modelToRest(entity: AppModel): RestModel;

  restToModel(entity: RestModel): AppModel;
}
