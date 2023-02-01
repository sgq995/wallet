import {
  IUseUncontrolledFormComponentOptions,
  useUncontrolledFormComponent,
} from './use-uncontrolled-form-component';

function getInputValue(node: HTMLInputElement) {
  // TODO: Check input type
  return node.value;
}

export function useUncontrolledInput(
  name: string,
  options?: IUseUncontrolledFormComponentOptions<string>
) {
  return useUncontrolledFormComponent<HTMLInputElement, string>(
    name,
    getInputValue,
    options
  );
}
