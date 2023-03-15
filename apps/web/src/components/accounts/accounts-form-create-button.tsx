import { Send as SendIcon } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useFormStore } from '@wallet/form-store';
import { isUndefined } from 'lodash';
import { useCreateAccount } from '../../hooks/accounts/use-create-accounts';
import { TAccountBody } from '../../services';
import { TAccountsStore } from './accounts.types';

export const AccountsFormCreateButton: React.FC = () => {
  const { snapshot } = useFormStore<TAccountsStore>();
  const { isLoading, mutate } = useCreateAccount();

  const handleClick = () => {
    const data = snapshot();
    if (data.hasError === false) {
      const startingBalance: TAccountBody['startingBalance'] =
        !isUndefined(data.startingCents) && !isUndefined(data.startingUnits)
          ? {
              cents: data.startingCents,
              units: data.startingUnits,
            }
          : undefined;

      mutate({
        label: data.label,
        balance: {
          cents: data.cents,
          units: data.units,
        },
        currencyId: data.currency,
        startingBalance,
      });
    }
  };

  return (
    <Button
      color="primary"
      fullWidth
      disabled={isLoading}
      endIcon={<SendIcon />}
      onClick={handleClick}
    >
      Send
    </Button>
  );
};
