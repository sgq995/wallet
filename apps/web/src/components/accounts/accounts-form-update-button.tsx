import { Save as SaveIcon } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useFormStore } from '@wallet/form-store';
import { TIndex } from '@wallet/utilities/model.utility';
import React from 'react';
import { useUpdateAccount } from '../../hooks/accounts/use-update-account';
import { TAccountsStore } from './accounts.types';
import { accountStoreToModel } from './accounts.utility';

export interface IAccountsFormUpdateButton {
  id: TIndex;
}

export const AccountsFormUpdateButton: React.FC<IAccountsFormUpdateButton> = ({
  id,
}) => {
  const { snapshot } = useFormStore<TAccountsStore>();
  const { isLoading, mutate } = useUpdateAccount();

  const handleClick = () => {
    const data = snapshot();
    if (data.hasError === false) {
      const params = { id };
      const account = accountStoreToModel(data);
      mutate({ params, account });
    }
  };

  return (
    <Button
      color="primary"
      fullWidth
      disabled={isLoading}
      endIcon={<SaveIcon />}
      onClick={handleClick}
    >
      Save
    </Button>
  );
};
