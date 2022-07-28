import { IFormState } from './state';
import { FormActionType, IFormAction } from './actions';

export function reducer(
  state: IFormState,
  action: IFormAction
): IFormState {
  switch (action.type) {
    case FormActionType.Change:
      return { ...state, data: { ...state.data, ...action.payload } };

    case FormActionType.Error:
      return { ...state, error: { ...state.error, ...action.payload } };

    default:
      throw new Error('Unknown action type');
  }
}
