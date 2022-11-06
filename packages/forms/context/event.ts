import { TFormEvent } from './action';
import { setError } from './methods/controlled/set-error';
import { setIsValid } from './methods/controlled/set-is-valid';
import { setValue } from './methods/controlled/set-value';
import { reset } from './methods/reset';

export type TEventList = {
  [Action: string]: TFormEvent;
};

export const event: TEventList = {
  setError,
  setIsValid,
  setValue,
  reset,
};
