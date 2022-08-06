import { createContext } from 'react';

import { IFormDispatch, IFormState } from './state';

export interface IFormContext {
  state: IFormState;
  dispatch: IFormDispatch;
}

export const FormContext = createContext<IFormContext>({
  state: { data: {}, error: {} },
  dispatch: { change: () => {}, error: () => {}, reset: () => {} },
});
