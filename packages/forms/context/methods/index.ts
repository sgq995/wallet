import {
  method as setValueMethod,
  type as setValueType,
} from './controlled/set-value';
import { method as resetMethod, type as resetType } from './reset';

export const types = {
  setValue: setValueType,
  reset: resetType,
};

export const methods = {
  setValue: setValueMethod,
  reset: resetMethod,
};
