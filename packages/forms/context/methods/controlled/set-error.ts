import produce from 'immer';
import { TFormActionMethod, TFormEvent } from '../../action';
import { IFormState } from '../../state';

export const type = 'controlled.set.error';

export interface IFormSetErrorPayload<T> {
  name: string;
  error: T | null;
}

export const method: TFormActionMethod = <T>(
  state: IFormState,
  payload: IFormSetErrorPayload<T>
) => {
  return {
    ...state,
    controlled: {
      ...state.controlled,
      error: {
        ...state.controlled?.error,
        [payload.name]: payload.error,
      },
    },
  };
};

export const setError: TFormEvent<IFormSetErrorPayload<any>> = (
  name,
  error
) => ({
  type,
  payload: { name, error },
});
