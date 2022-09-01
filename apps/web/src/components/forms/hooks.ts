import { useCallback, useContext, useEffect, useReducer } from 'react';

import {
  IFormData,
  IFormDispatch,
  IFormError,
  IFormParser,
  IFormState,
} from './state';
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
    parser: {},
  });

  const change = useCallback(
    (newState: IFormData) =>
      dispatch({ type: FormActionType.Change, payload: newState }),
    []
  );

  const error = useCallback(
    (newState: IFormError) =>
      dispatch({ type: FormActionType.Error, payload: newState }),
    []
  );

  const setParser = useCallback(
    (parser: IFormParser) =>
      dispatch({ type: FormActionType.SetParser, payload: parser }),
    []
  );

  const reset = useCallback(
    () => dispatch({ type: FormActionType.Reset, payload: initialState }),
    [initialState]
  );

  const formDispatch: IFormDispatch = {
    change,
    error,
    setParser,
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

export interface IFormParserFunction<T> {
  (value: string): T;
}

export interface IFormControllerOptions<T> {
  filter?: (value: string) => string;
  validator?: (value: string) => boolean;
  parser?: (value: string) => T;
}

export function useFormController<T>(
  name: string,
  options?: IFormControllerOptions<T>
): [string, boolean, IOnChange] {
  const { state, dispatch } = useContext(FormContext);

  useEffect(() => {
    dispatch.setParser({ [name]: options?.parser });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = state.data[name] ?? '';
  const error = state.error[name] ?? false;
  const onChange = useCallback(
    (newValue: string) => {
      const filter: IFormFilter = options?.filter ?? ((value: string) => value);
      const validator: IFormValidator = options?.validator ?? (() => true);

      const filteredValue = filter(newValue);
      dispatch.error({ [name]: !validator(filteredValue) });
      dispatch.change({ [name]: filteredValue });
    },
    [name, dispatch, options]
  );

  return [value, error, onChange];
}
