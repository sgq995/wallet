import { useRef } from 'react';
import {
  getFormLogicOptions,
  IUseFormLogicOptions,
  useFormLogic,
} from './use-form-logic';

interface IUseUncontrolledComponentOptions<T> extends IUseFormLogicOptions<T> {}

export function useUncontrolledComponent<T = string, E = unknown, R = unknown>(
  options?: IUseUncontrolledComponentOptions<T>
) {
  const ref = useRef<R>();
  const formLogic = useFormLogic<T, E>(getFormLogicOptions(options));

  return {
    ref,
    formLogic,
  };
}
