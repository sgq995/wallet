import { Stack } from '@mui/material';
import { TAccountModel } from 'schemas/accounts/model';

import { Form, FormAmountField, FormSubmitButton } from '../forms';
import FormNameField from '../forms/FormNameField';

export interface AccountFormProps {
  account?: TAccountModel;
}

export const AccountForm: React.FC<AccountFormProps> = ({ account }) => {
  const isNewAccount = !account;

  return (
    <Form initialState={{ name: '', units: '0', cents: '', currency: '' }}>
      <Stack direction="column" spacing={2}>
        <FormNameField required={isNewAccount} fullWidth />

        <Stack direction="row" spacing={2}>
          <FormAmountField required={isNewAccount} fullWidth />
        </Stack>

        <FormSubmitButton disabledOnError resetOnSubmit={isNewAccount} />
      </Stack>
    </Form>
  );
};
