import { useCallback, useContext } from 'react';
import {
  getFormLogicOptions,
  IUseFormLogicOptions,
  useFormLogic,
} from '../../hooks/use-form-logic';
import { FormContext } from '../context';
import { event } from '../event';
import { IFormState } from '../state';

function getControlledFormValue(state: IFormState, name: string) {
  return state.controlled?.values?.[name] ?? state.defaultValues?.[name];
}

function getControlledFormError(state: IFormState, name: string) {
  return state.controlled?.error?.[name];
}

function getControlledFormIsValid(state: IFormState, name: string) {
  return state.controlled?.isValid?.[name];
}
export interface IUseControlledFormComponentOptions<T>
  extends IUseFormLogicOptions<T> {
  name: string;
}

export function useControlledFormComponent<T = string, E = unknown>(
  options: IUseControlledFormComponentOptions<T>
) {
  const { name } = options;

  const { state, dispatch } = useContext(FormContext);
  const value = getControlledFormValue(state, name);
  const error = getControlledFormError(state, name);
  const isValid = getControlledFormIsValid(state, name);

  const formLogic = useFormLogic<T, E>(getFormLogicOptions(options));

  const onChange = useCallback(
    (newValue: T) => {
      const { value, error, isValid } = formLogic(newValue);

      dispatch(event.setValue(name, value));
      dispatch(event.setError(name, error));
      dispatch(event.setIsValid(name, isValid));
    },
    [formLogic, dispatch, name]
  );

  return {
    value,
    error,
    onChange,
    isValid,
  };
}
