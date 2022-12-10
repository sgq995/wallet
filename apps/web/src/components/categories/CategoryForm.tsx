import { Stack } from '@mui/material';
import { TCategoryModel } from 'schemas/categories/model';

import { Form, FormNameField, FormSubmitButton } from '../forms';

export interface CategoryFormData {
  name: string;
}

export interface CategoryFormProps {
  account?: TCategoryModel;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({ account }) => {
  const isNewAccount = !account;

  return (
    <Form defaultValues={{ name: '' }}>
      <Stack direction="column" spacing={2}>
        <FormNameField required={isNewAccount} fullWidth />

        <FormSubmitButton disabledOnError resetOnSubmit={isNewAccount} />
      </Stack>
    </Form>
  );
};
