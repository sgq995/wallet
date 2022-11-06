import { IFormAction, TFormActionMethod } from './action';
import { methods, types } from './methods';
import { IFormState } from './state';

export type TFormReducer = (
  state: IFormState,
  action: IFormAction
) => IFormState;

export type TFormActionMap = {
  [Type: string]: TFormActionMethod<any>;
};

function reducerFactory(actionsMap: TFormActionMap): TFormReducer {
  return function (state, action) {
    if (actionsMap[action.type]) {
      const method = actionsMap[action.type];
      return method(state, action.payload);
    }

    throw new Error(`Action ${action.type} not found`);
  };
}

export const reducer: TFormReducer = reducerFactory({
  [types.setValue]: methods.setValue,
  [types.reset]: methods.reset,
});
