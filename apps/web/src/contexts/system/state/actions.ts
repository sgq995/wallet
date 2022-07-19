export enum SystemAction {
  UpdateEntryTypes,
  UpdateCurrencies,
}

export interface ISystemAction {
  type: SystemAction;
  payload: any;
}
