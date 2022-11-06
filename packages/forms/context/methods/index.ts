import {
  method as setErrorMethod,
  type as setErrorType,
} from './controlled/set-error';
import {
  method as setIsValidMethod,
  type as setIsValidType,
} from './controlled/set-is-valid';
import {
  method as setValueMethod,
  type as setValueType,
} from './controlled/set-value';
import { method as resetMethod, type as resetType } from './reset';

export const types = {
  setError: setErrorType,
  setIsValid: setIsValidType,
  setValue: setValueType,
  reset: resetType,
};

export const methods = {
  setError: setErrorMethod,
  setIsValid: setIsValidMethod,
  setValue: setValueMethod,
  reset: resetMethod,
};
