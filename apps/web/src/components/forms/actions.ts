export enum FormActionType {
  Change,
  Error,
}

export interface IFormAction {
  type: FormActionType;
  payload: any;
}
