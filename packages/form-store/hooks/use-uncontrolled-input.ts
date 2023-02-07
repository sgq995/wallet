import {
  IUseUncontrolledFormComponentOptions,
  useUncontrolledFormComponent,
} from './use-uncontrolled-form-component';

function getInputValue(node: HTMLInputElement) {
  // TODO: Check input type
  return node.value;
}

export function useUncontrolledInput<Value = unknown>(
  name: string,
  options?: IUseUncontrolledFormComponentOptions<Value>
) {
  return useUncontrolledFormComponent<HTMLInputElement, Value>(
    name,
    getInputValue,
    options
  );
}
