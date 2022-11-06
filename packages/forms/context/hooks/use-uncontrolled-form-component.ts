import { useContext, useEffect, useRef } from 'react';
import {
  getFormLogicOptions,
  IUseFormLogicOptions,
  useFormLogic,
} from '../../hooks';
import { FormContext } from '../context';
import { event } from '../event';

interface IUseUncontrolledFormComponentOptions<T>
  extends IUseFormLogicOptions<T> {
  name: string;
}

export function useUncontrolledFormComponent<
  R = unknown,
  T = string,
  E = unknown
>(options: IUseUncontrolledFormComponentOptions<T>) {
  const { name } = options;

  const { state, dispatch } = useContext(FormContext);

  const ref = useRef<R>();
  const formLogic = useFormLogic<T, E>(getFormLogicOptions(options));

  useEffect(() => {
    dispatch(event.setRef(name, ref));
  }, [dispatch, name]);

  return {
    ref,
    formLogic,
  };
}
