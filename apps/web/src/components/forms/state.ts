export interface IFormData {
  [K: string]: string;
}

export interface IFormError {
  [K: string]: boolean;
}

export interface IFormState {
  data: IFormData;
  error: IFormError;
}

export interface IFormChangeAction {
  (newState: IFormData): void;
}

export interface IFormErrorAction {
  (newState: IFormError): void;
}

export interface IFormResetAction {
  (): void;
}

export interface IFormDispatch {
  change: IFormChangeAction;
  error: IFormErrorAction;
  reset: IFormResetAction;
}
