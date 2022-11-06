import { IFormData } from '../state/state';

export function getErrorFromInitialData(initialData: IFormData) {
  return Object.keys(initialData).reduce((error, key) => {
    error[key] = false;
    return error;
  }, {});
}
