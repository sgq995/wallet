export interface IFormControlledState {
  values?: Record<string, any>;
  error?: Record<string, any>;
  isValid?: Record<string, boolean>;
}

export interface IFormState {
  defaultValues?: Record<string, any>;
  controlled?: IFormControlledState;
}

export const state: IFormState = {};
