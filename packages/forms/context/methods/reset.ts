import { IFormAction, TFormActionMethod, TFormEvent } from '../action';

export const type = 'reset';

export const method: TFormActionMethod<IFormAction> = (state) => {
  if (state.defaultValues) {
    const defaultValues = state.defaultValues;

    if (state.controlledValues) {
      const controlledValues = state.controlledValues;
      const defaultControlledValues = Object.keys(defaultValues).reduce<
        Record<string, any>
      >((values, name) => {
        if (controlledValues[name]) {
          values[name] = defaultValues[name];
        }
        return values;
      }, {});

      state.controlledValues = {
        ...state.controlledValues,
        ...defaultControlledValues,
      };
    }
  }

  return { ...state };
};

export const reset: TFormEvent = () => ({ type });
