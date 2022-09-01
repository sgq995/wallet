import { IFormState } from './state';
import { FormActionType, IFormAction } from './actions';
import { getErrorFromInitialData } from './utils';

export function reducer(state: IFormState, action: IFormAction): IFormState {
  switch (action.type) {
    case FormActionType.Change:
      return { ...state, data: { ...state.data, ...action.payload } };

    case FormActionType.Error:
      return { ...state, error: { ...state.error, ...action.payload } };

    case FormActionType.SetParser:
      return { ...state, parser: { ...state.parser, ...action.payload } };

    case FormActionType.Reset:
      return {
        data: action.payload,
        error: getErrorFromInitialData(action.payload),
        parser: state.parser,
      };

    default:
      throw new Error('Unknown action type');
  }
}
