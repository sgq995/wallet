import { Button, TextField, Typography } from '@mui/material';
import {
  FormStoreProvider,
  useFormStore,
  useUncontrolledFormComponent,
} from '@wallet/form-store';

function getInputValue(node: HTMLInputElement) {
  return node.value;
}

const TransactionFormType: React.FC = () => {
  const amountRef = useUncontrolledFormComponent<HTMLInputElement, string>(
    'amount',
    getInputValue
  );

  const descriptionRef = useUncontrolledFormComponent<HTMLInputElement, string>(
    'description',
    getInputValue
  );

  const { snapshot } = useFormStore();

  const handleSubmit = () => {
    const store = snapshot();
    console.log(store);
  };

  return (
    <>
      <TextField inputRef={amountRef} variant="outlined" />
      <TextField inputRef={descriptionRef} variant="outlined" />

      <Button onClick={handleSubmit}>
        <Typography>Show</Typography>
      </Button>
    </>
  );
};

export const TransactionsForm: React.FC = () => {
  return (
    <FormStoreProvider
      defaultValues={{
        amount: '0',
      }}
    >
      <TransactionFormType />
    </FormStoreProvider>
  );
};
