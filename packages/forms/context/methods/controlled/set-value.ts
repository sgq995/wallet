import { TFormActionMethod, TFormEvent } from '../../action';
import { IFormState } from '../../state';

export const type = 'controlled.set.value';

export interface IFormSetValuePayload<T> {
  name: string;
  value: T;
}

export const method: TFormActionMethod = <T>(
  state: IFormState,
  payload: IFormSetValuePayload<T>
) => {
  return {
    ...state,
    controlledValues: {
      ...state.controlledValues,
      [payload.name]: payload.value,
    },
  };
};

export const setValue: TFormEvent<IFormSetValuePayload<any>> = (
  name,
  value
) => ({
  type,
  payload: { name, value },
});
