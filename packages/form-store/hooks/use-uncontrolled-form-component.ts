import { useCallback } from 'react';
import { useFormStore } from './use-form-store';

export function useUncontrolledFormComponent<Node, Value>(
  name: string,
  rawValue: (node: Node) => Value,
  defaultValue?: Value
) {
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
