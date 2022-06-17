import { ChangeEvent, useState } from 'react';

import Stack from '@mui/material/Stack';

import { FormControl, TextField } from '../Material';
import SaveButton from '../SaveButton';
import { useAddOneMutation } from '../../hooks/accounts';

function balanceFilter(value: string) {
  return value.replaceAll('[^0-9]', '');
}

function nameValidator(value: string) {
  return value.length > 0 && value.length < 256;
}

function balanceValidator(value: string) {
  const balance = parseFloat(value);
  return !isNaN(balance) && isFinite(balance);
}

const filters = {
  balance: balanceFilter,
};

const validators = {
  name: nameValidator,
  balance: balanceValidator,
};

function detectWrongFields(
  fieldsRecord: object,
  fieldsToCheck: string[],
  isValidField: (field: string, value: string) => boolean
): { hasError: boolean; errorsRecord: Record<string, boolean> } {
  const errorsRecord = {};
  fieldsToCheck.forEach((field) => {
    const value = fieldsRecord[field];
    errorsRecord[field] = !isValidField(field, value);
  });
  const hasError = Object.values(errorsRecord).some((error) => error);
  return { hasError, errorsRecord };
}

const initialForm = { name: '', balance: '' };

export default function AccountForm() {
  const [formData, setFormData] = useState(initialForm);
  const [formError, setFormError] = useState({ name: false, balance: false });

  const { isLoading, isSuccess, isError, data, error, mutate } =
    useAddOneMutation();

  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    const filteredValue =
      typeof filters[name] === 'function' ? filters[name](value) : value;

    const isValidValue =
      typeof validators[name] === 'function' ? validators[name](value) : true;

    setFormData({ ...formData, [name]: filteredValue });
    setFormError({ ...formError, [name]: !isValidValue });
  };

  const validateFormFields = (
    fieldsToCheck: string[],
    isValidField: (field: string, value: string) => boolean
  ) => {
    const { hasError, errorsRecord } = detectWrongFields(
      formData,
      fieldsToCheck,
      isValidField
    );

    if (hasError) {
      setFormError({
        ...formError,
        ...errorsRecord,
      });
    }

    return !hasError;
  };

  const areRequiredFieldsFilled = () => {
    const required = ['name', 'balance'];
    return validateFormFields(required, (_, value) => value.length > 0);
  };

  const areFieldsCorrectlyFilled = () => {
    return validateFormFields(Object.keys(formData), (field, value) =>
      typeof validators[field] === 'function' ? validators[field](value) : true
    );
  };

  const handleSubmit = () => {
    if (!areRequiredFieldsFilled()) {
      return;
    }

    if (!areFieldsCorrectlyFilled()) {
      return;
    }

    mutate({
      name: formData.name,
      balance: parseFloat(formData.balance),
    });

    setFormData(initialForm);
  };

  return (
    <Stack component="form" noValidate spacing={2}>
      <FormControl fullWidth error={formError.name}>
        <TextField
          required
          id="account-form-name"
          name="name"
          label="Name"
          variant="outlined"
          error={formError.name}
          value={formData.name}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl fullWidth error={formError.balance}>
        <TextField
          required
          inputMode="numeric"
          id="account-form-balance"
          name="balance"
          label="Starting balance"
          variant="outlined"
          error={formError.balance}
          value={formData.balance}
          onChange={handleChange}
        />
      </FormControl>

      <SaveButton onClick={handleSubmit} />
    </Stack>
  );
}
