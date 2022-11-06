import { TFormEvent } from './action';
import { setError } from './methods/controlled/set-error';
import { setIsValid } from './methods/controlled/set-is-valid';
import { setValue } from './methods/controlled/set-value';
import { reset } from './methods/reset';
import { setRef } from './methods/uncontrolled/set-ref';

// export type TEventList = {
//   [Action: string]: TFormEvent;
// };

export const event = {
  setError,
  setIsValid,
  setValue,
  reset,
  setRef,
};
