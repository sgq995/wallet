import { useCallback } from 'react';
import { IFormComponentOptions } from './types';
import { useFormStore } from './use-form-store';

export interface IUseUncontrolledFormComponentOptions<Value>
  extends IFormComponentOptions<Value> {}

export function useUncontrolledFormComponent<Node, Value>(
  name: string,
  rawValue: (node: Node) => Value,
  options?: IUseUncontrolledFormComponentOptions<Value>
) {
  const { defaultValue } = options ?? {};
  const formStore = useFormStore();

  const refCallback = useCallback(
    (node: Node) => {
      formStore.register({
        name,
        rawValue() {
          return rawValue(node);
        },
        defaultValue,
      });
    },
    [formStore, name, rawValue, defaultValue]
  );

  return refCallback;
}
