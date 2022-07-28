import { useCallback, useContext, useReducer } from 'react';

import { IFormData, IFormDispatch, IFormError, IFormState } from './state';
import { FormActionType } from './actions';
import { reducer } from './reducer';
import { FormContext } from './context';
import { getErrorFromInitialData } from './utils';

export function useFormState(
  initialState: IFormData
): [IFormState, IFormDispatch] {
  const [state, dispatch] = useReducer(reducer, {
    data: initialState,
    error: getErrorFromInitialData(initialState),
  });

  const change = useCallback(
    (newState: IFormData) =>
      dispatch({ type: FormActionType.Change, payload: newState }),
    [state]
  );

  const error = useCallback(
    (newState: IFormError) =>
      dispatch({ type: FormActionType.Error, payload: newState }),
    [state]
  );

  const reset = useCallback(
    () => dispatch({ type: FormActionType.Reset, payload: initialState }),
    [initialState]
  );

  const formDispatch: IFormDispatch = {
    change,
    error,
    reset,
  };

  return [state, formDispatch];
}

export interface IOnChange {
  (newValue: string): void;
}

export interface IFormFilter {
  (value: string): string;
}

export interface IFormValidator {
  (value: string): boolean;
}

export interface IFormControllerOptions {
  filter?: (value: string) => string;
  validator?: (value: string) => boolean;
}

export function useFormController(
  name: string,
  options?: IFormControllerOptions
): [string, boolean, IOnChange] {
  const { state, dispatch } = useContext(FormContext);

  const filter: IFormFilter = options?.filter ?? ((value: string) => value);
  const validator: IFormValidator = options?.validator ?? (() => true);

  const value = state.data[name] ?? '';
  const error = state.error[name] ?? false;
  const onChange = useCallback(
    (newValue: string) => {
      const filteredValue = filter(newValue);
      dispatch.error({ [name]: !validator(filteredValue) });
      dispatch.change({ [name]: filteredValue });
    },
    [name, dispatch]
  );

  return [value, error, onChange];
}
