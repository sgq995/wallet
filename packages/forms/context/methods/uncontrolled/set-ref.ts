import { MutableRefObject } from 'react';
import { TFormActionMethod, TFormEvent } from '../../action';
import { IFormState } from '../../state';

export const type = 'controlled.set.ref';

export interface IFormSetRefPayload<T> {
  name: string;
  ref: MutableRefObject<T>;
}

export const method: TFormActionMethod = <T>(
  state: IFormState,
  payload: IFormSetRefPayload<T>
) => {
  return {
    ...state,
    uncontrolled: {
      ...state.uncontrolled,
      refs: {
        ...state.uncontrolled?.refs,
        [payload.name]: payload.ref,
      },
    },
  };
};

export const setRef: TFormEvent<IFormSetRefPayload<any>> = (name, ref) => ({
  type,
  payload: { name, ref },
});
