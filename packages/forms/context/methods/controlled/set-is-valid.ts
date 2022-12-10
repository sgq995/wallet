import { TFormActionMethod, TFormEvent } from '../../action';
import { IFormState } from '../../state';

export const type = 'controlled.set.is.valid';

export interface IFormSetIsValidPayload<T> {
  name: string;
  isValid: T;
}

export const method: TFormActionMethod = <T>(
  state: IFormState,
  payload: IFormSetIsValidPayload<T>
) => {
  return {
    ...state,
    controlled: {
      ...state.controlled,
      isValid: {
        ...state.controlled?.isValid,
        [payload.name]: payload.isValid,
      },
    },
  };
};

export const setIsValid: TFormEvent<IFormSetIsValidPayload<any>> = (
  name,
  isValid
) => ({
  type,
  payload: { name, isValid },
});
