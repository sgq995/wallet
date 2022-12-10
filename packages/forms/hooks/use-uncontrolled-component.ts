import { useEffect, useRef } from 'react';
import {
  getFormLogicOptions,
  IUseFormLogicOptions,
  useFormLogic,
} from './use-form-logic';

interface IUseUncontrolledComponentOptions<T> extends IUseFormLogicOptions<T> {}

export function useUncontrolledComponent<R = unknown, T = string, E = unknown>(
  options?: IUseUncontrolledComponentOptions<T>
) {
  const ref = useRef<R>();
  const formLogic = useFormLogic<T, E>(getFormLogicOptions(options));

  return {
    ref,
    formLogic,
  };
}
