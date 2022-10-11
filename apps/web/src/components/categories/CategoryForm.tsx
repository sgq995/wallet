import { Stack } from '@mui/material';
import { TCategoryModel } from 'schemas/categories/model';

import { Form, FormSubmitButton } from '../forms';
import FormNameField from '../forms/FormNameField';

export interface CategoryFormData {
  name: string;
}

export interface CategoryFormProps {
  account?: TCategoryModel;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({ account }) => {
  const isNewAccount = !account;

  return (
    <Form initialState={{ name: '' }}>
      <Stack direction="column" spacing={2}>
        <FormNameField required={isNewAccount} fullWidth />

        <FormSubmitButton disabledOnError resetOnSubmit={isNewAccount} />
      </Stack>
    </Form>
  );
};
