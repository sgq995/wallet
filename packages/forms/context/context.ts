import { createContext, Dispatch } from 'react';
import { IFormAction } from './action';
import { IFormState, state } from './state';

export interface IFormContext {
  state: IFormState;
  dispatch: Dispatch<IFormAction>;
}

export const DEFAULT_FORM_CONTEXT: IFormContext = {
  state,
  dispatch: () => {},
};

export const FormContext = createContext<IFormContext>(DEFAULT_FORM_CONTEXT);
