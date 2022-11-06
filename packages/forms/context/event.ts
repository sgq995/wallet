import { TFormEvent } from './action';
import { setValue } from './methods/controlled/set-value';
import { reset } from './methods/reset';

export type TEventList = {
  [Action: string]: TFormEvent;
};

export const event: TEventList = {
  setValue,
  reset,
};
