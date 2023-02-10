import { Send as SendIcon } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useFormStore } from '@wallet/form-store';
import { useCreateAccount } from '../../hooks/accounts/use-create-accounts';
import { TAccountsStore } from './accounts.types';

export const AccountsFormCreateButton: React.FC = () => {
  const { snapshot } = useFormStore<TAccountsStore>();
  const { isLoading, mutate } = useCreateAccount();

  const handleClick = () => {
    const data = snapshot();
    console.log({ data });
    if (data.hasError === false) {
      const hasStartingBalance =
        isFinite(data.startingCents) && isFinite(data.startingUnits);

      mutate({
        label: data.label,
        balance: {
          cents: data.cents,
          units: data.units,
        },
        currencyId: data.currency,
        startingBalance: hasStartingBalance
          ? {
              cents: data.startingCents,
              units: data.startingUnits,
            }
          : undefined,
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
