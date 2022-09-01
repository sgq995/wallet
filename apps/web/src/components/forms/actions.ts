export enum FormActionType {
  Change,
  Error,
  SetParser,
  Reset,
}

export interface IFormAction {
  type: FormActionType;
  payload: any;
}
