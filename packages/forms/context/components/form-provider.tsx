import { PropsWithChildren, useReducer } from 'react';
import { FormContext, IFormContext } from '../context';
import { reducer } from '../reducer';
import { state } from '../state';

const DEFAULT_STATE = state;

export interface IFormProviderProps extends PropsWithChildren {
  defaultValues?: Record<string, any>;
}

export const FormProvider: React.FC<IFormProviderProps> = ({
  children,
  defaultValues,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    ...DEFAULT_STATE,
    defaultValues,
  });
  const value: IFormContext = {
    state,
    dispatch,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};
