export interface IReadonlyAdapter<ReadonlyModel, ReadonlySchema> {
  readonlyModelToSchema(entity: ReadonlyModel): ReadonlySchema;

  readonlySchemaToModel(entity: ReadonlySchema): ReadonlyModel;
}

export interface IMutableAdapter<MutableModel, MutableSchema> {
  mutableModelToSchema(entity: MutableModel): MutableSchema;

  mutableSchemaToModel(entity: MutableSchema): MutableModel;
}
