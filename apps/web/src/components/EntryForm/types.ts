import type { SelectProps, TextFieldProps } from '@mui/material';

export interface IFormControlState {
  description?: string;
  amount?: string;
  day?: string;
  month?: string;
  year?: string;
  typeId?: string;
  accountId?: string;
  categoryId?: string;
}

export type ConvertKeyTo<T, R> = { [K in keyof T]: R };

export interface IFormErrorState
  extends ConvertKeyTo<IFormControlState, boolean> {}

export type Filter = (value: string) => string;

export interface IFormFilters extends ConvertKeyTo<IFormControlState, Filter> {}

export type Validator = (value: string) => boolean;

export interface IFormValidators
  extends ConvertKeyTo<IFormControlState, Validator> {}

export interface EntryFormComponentProps {
  form: IFormControlState;
  error: IFormErrorState;
  handleChange?: SelectProps['onChange'] | TextFieldProps['onChange'];
}
