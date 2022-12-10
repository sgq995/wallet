import { MutableRefObject } from 'react';

export interface IFormControlledState {
  values?: Record<string, any>;
  error?: Record<string, any>;
  isValid?: Record<string, boolean>;
}

export interface IFormUncontrolledState {
  refs?: Record<string, MutableRefObject<any>>;
}

export interface IFormState {
  defaultValues?: Record<string, any>;
  controlled?: IFormControlledState;
  uncontrolled?: IFormUncontrolledState;
}

export const state: IFormState = {};
