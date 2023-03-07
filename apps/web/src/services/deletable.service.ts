export interface IDeletable<Params, Result> {
  remove(params: Params): Promise<Result>;
}
