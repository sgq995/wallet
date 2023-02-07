import { useCallback } from 'react';
import { IFormComponentOptions } from './types';
import { useFormStore } from './use-form-store';

export interface IUseUncontrolledFormComponentOptions<Value = unknown>
  extends IFormComponentOptions<Value> {}

export function useUncontrolledFormComponent<Node, Value = unknown>(
  name: string,
  rawValue: (node: Node) => string,
  options?: IUseUncontrolledFormComponentOptions<Value>
) {
  const { defaultValue, rawValidator, parser, validator } = options ?? {};
  const formStore = useFormStore();

  const refCallback = useCallback(
    (node: Node) => {
      formStore.unregister(name);
      formStore.register({
        name,
        rawValue() {
          return rawValue(node);
        },
        defaultValue,
        rawValidator,
        parser,
        validator,
      });
    },
    [formStore, name, rawValue, defaultValue, rawValidator, parser, validator]
  );

  return refCallback;
}
