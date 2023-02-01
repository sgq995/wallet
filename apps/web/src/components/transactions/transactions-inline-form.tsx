import { Add as AddIcon } from '@mui/icons-material';
import { Box, IconButton, Stack, TextField } from '@mui/material';
import { FormStoreProvider, useUncontrolledInput } from '@wallet/form-store';
import { FormDateField } from '../forms/form-date-field';

const DEFAULT_TRANSACTIONS_FORM_VALUES = {
  type: '',
  description: '',
};

const { type, description } = DEFAULT_TRANSACTIONS_FORM_VALUES;

export const TransactionsInlineForm: React.FC = () => {
  const typeRef = useUncontrolledInput('type', { defaultValue: type });
  const descriptionRef = useUncontrolledInput('description', {
    defaultValue: description,
  });

  return (
    <FormStoreProvider defaultValues={DEFAULT_TRANSACTIONS_FORM_VALUES}>
      <Stack direction="row" spacing={4}>
        <FormDateField
          id="transactions-date"
          name="transactions-date"
          required
        />

        <TextField
          id="transactions-type"
          ref={typeRef}
          defaultValue={type}
          label="Type"
          required
          select
          SelectProps={{
            native: true,
          }}
        >
          <option value="" disabled></option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </TextField>

        <TextField
          id="transactions-description"
          ref={descriptionRef}
          defaultValue={description}
          label="Description"
        />

        <Box display="flex" alignItems="center">
          <IconButton color="primary" sx={{ flexGrow: 0 }}>
            <AddIcon />
          </IconButton>
        </Box>
      </Stack>
    </FormStoreProvider>
  );
};
