export interface IFormData {
  [K: string]: string;
}

export interface IFormError {
  [K: string]: boolean;
}

export interface IFormParser<T = unknown> {
  [K: string]: (name: string) => T;
}

export interface IFormState {
  data: IFormData;
  error: IFormError;
  parser: IFormParser;
}

export interface IFormChangeAction {
  (newState: IFormData): void;
}

export interface IFormErrorAction {
  (newState: IFormError): void;
}

export interface IFormParserAction {
  (parser: IFormParser): void;
}

export interface IFormResetAction {
  (): void;
}

export interface IFormDispatch {
  change: IFormChangeAction;
  error: IFormErrorAction;
  setParser: IFormParserAction;
  reset: IFormResetAction;
}
