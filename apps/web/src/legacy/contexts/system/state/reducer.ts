import { ISystemContext } from '../SystemContext';

import { ISystemAction, SystemAction } from './actions';

export function systemReducer(state: ISystemContext, action: ISystemAction) {
  switch (action.type) {
    case SystemAction.UpdateEntryTypes:
      return { ...state, entryTypes: action.payload };

    case SystemAction.UpdateCurrencies:
      return { ...state, currencies: action.payload };

    default:
      throw Error(`Unknown system action ${action.type}`);
  }
}
