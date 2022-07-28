export enum FormActionType {
  Change,
  Error,
  Reset,
}

export interface IFormAction {
  type: FormActionType;
  payload: any;
}
