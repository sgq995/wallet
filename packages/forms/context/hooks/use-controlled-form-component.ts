import { useCallback, useContext } from 'react';
import {
  getFormLogicOptions,
  IUseFormLogicOptions,
  useFormLogic,
} from '../../hooks/use-form-logic';
import { FormContext } from '../context';
import { event } from '../event';

export interface IUseControlledFormComponentOptions<T>
  extends IUseFormLogicOptions<T> {
  name: string;
}

export function useControlledFormComponent<T, E>(
  options: IUseControlledFormComponentOptions<T>
) {
  const { name } = options;
  
  const { state, dispatch } = useContext(FormContext);
  const value = state.controlledValues?.[name] ?? state.defaultValues?.[name];

  const formLogic = useFormLogic<T, E>(getFormLogicOptions(options));

  const onChange = useCallback(
    (newValue: T) => {
      const { value } = formLogic(newValue);

      dispatch(event.setValue(name, value));
    },
    [formLogic, dispatch, name]
  );

  return {
    value,
    onChange,
  };
}
