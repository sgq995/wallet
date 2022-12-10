import { IFormState } from './state';

export interface IFormAction<TPayload = any> {
  type: string;
  payload?: TPayload;
}

export type TFormActionMethod<T = any> = (
  state: IFormState,
  payload: T
) => IFormState;

export type TFormEvent<TPayload = unknown> = (
  ...args: any[]
) => IFormAction<TPayload>;
