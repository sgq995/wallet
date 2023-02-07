export interface IFormComponentOptions<Value = unknown> {
  defaultValue?: string;
  rawValidator?: (value: string) => boolean;
  parser?: (value: string) => Value;
  validator?: (value: Value) => boolean;
}
