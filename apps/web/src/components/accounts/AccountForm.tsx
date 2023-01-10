import { Stack } from '@mui/material';
import { TAccountModel } from '@wallet/schemas/legacy/accounts/model';

import {
  FormContainer,
  FormAmountField,
  FormNameField,
  FormSubmitButton,
} from '../forms';

export interface AccountFormProps {
  account?: TAccountModel;
}

export const AccountForm: React.FC<AccountFormProps> = ({ account }) => {
  const isNewAccount = !account;

  return (
    <FormContainer defaultValues={{ name: '', units: '0', cents: '', currency: '' }}>
      <Stack direction="column" spacing={2}>
        <FormNameField required={isNewAccount} fullWidth />

        <Stack direction="row" spacing={2}>
          <FormAmountField required={isNewAccount} fullWidth />
        </Stack>

        <FormSubmitButton disabledOnError resetOnSubmit={isNewAccount} />
      </Stack>
    </FormContainer>
  );
};
