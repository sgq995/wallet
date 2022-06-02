import { ChangeEvent, useEffect, useState } from 'react';

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
  Stack,
  TextField,
} from '@mui/material';

import { Save as SaveIcon } from '@mui/icons-material';
import {
  IFormControlState,
  IFormErrorState,
  IFormFilters,
  IFormValidators,
} from './types';
import { MONTH_LIST } from './common';
import EntryFormDate from './EntryFormDate';

const filters: IFormFilters = {
  amount: (rawValue) => {
    // currency.js
    let value = rawValue;
    let decimal = '';

    const hasDecimalSeparator = rawValue.indexOf('.') > -1;
    if (hasDecimalSeparator) {
      const [integer, ...decimalParts] = value.split('.');
      value = integer;
      decimal = []
        .concat(decimalParts)
        .join('')
        .replaceAll(/[^0-9]/g, '');
    }

    const hasThousandsSeparator = rawValue.indexOf(',') > -1;
    if (hasThousandsSeparator) {
      value = value
        .split(',')
        .join('')
        .replaceAll(/[^0-9]/g, '');
    }

    for (let i = value.length - 3; i > 0; i -= 3) {
      const left = value.substring(0, i);
      const right = value.substring(i);
      value = `${left},${right}`;
    }

    return hasDecimalSeparator ? `${value}.${decimal}` : value;
  },
};

const validators: IFormValidators = {
  description: (value) => {
    if (value.length > 255) {
      return false;
    }

    return true;
  },
  amount: (value) => {
    const asNumber = parseFloat(value);

    if (isNaN(asNumber)) {
      return false;
    }

    if (asNumber < 0) {
      return false;
    }

    if (asNumber > Number.MAX_VALUE) {
      return false;
    }

    return true;
  },
};

export default function EntryForm() {
  const [form, setForm] = useState<IFormControlState>({
    description: '',
    amount: '',
    day: new Date().getDate().toString(),
    month: MONTH_LIST[new Date().getMonth()],
    year: new Date().getFullYear().toString(),
    typeId: '',
    accountId: '',
    categoryId: '',
  });
  const [warning, setWarning] = useState<IFormErrorState>({});
  const [error, setError] = useState<IFormErrorState>({});

  const formChange = (name: string, rawValue: string) => {
    const value =
      typeof filters[name] === 'function' ? filters[name](rawValue) : rawValue;

    const isValid =
      typeof validators[name] === 'function' ? validators[name](value) : true;

    setForm((prevForm) => {
      return {
        ...prevForm,
        [name]: value,
      };
    });
    setError((prevError) => {
      return {
        ...prevError,
        [name]: !isValid,
      };
    });
  };

  const handleChange = (
    event:
      | ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = event.target;
    formChange(name, value);
  };

  const handleSubmit = () => {};

  return (
    <Stack component="form" noValidate spacing={2}>
      <FormControl fullWidth error={error.description}>
        <TextField
          id="entry-form-description"
          name="description"
          label="Description"
          variant="outlined"
          multiline
          error={error.description}
          value={form.description}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl fullWidth error={error.amount}>
        <TextField
          required
          inputMode="numeric"
          id="entry-form-amount"
          name="amount"
          label="Amount"
          variant="outlined"
          error={error.amount}
          value={form.amount}
          onChange={handleChange}
        />
      </FormControl>

      <EntryFormDate
        form={form}
        error={error}
        handleChange={handleChange}
      />

      <FormControl fullWidth required error={error.typeId}>
        <InputLabel id="entry-form-type-label">Type</InputLabel>
        <Select
          required
          id="entry-form-type"
          name="typeId"
          labelId="entry-form-type-label"
          label="Type"
          value={form.typeId}
          onChange={handleChange}
        >
          <MenuItem value={1}>Income</MenuItem>
          <MenuItem value={2}>Expense</MenuItem>
          <MenuItem value={3}>Asset</MenuItem>
          <MenuItem value={4}>Liability</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth error={error.accountId}>
        <InputLabel id="entry-form-account-label">Account</InputLabel>
        <Select
          required
          id="entry-form-account"
          name="accountId"
          labelId="entry-form-account-label"
          label="Account"
          value={form.accountId}
          onChange={handleChange}
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value={1}>Davivienda</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth error={error.categoryId}>
        <InputLabel id="entry-form-category-label">Category</InputLabel>
        <Select
          required
          id="entry-form-category"
          name="categoryId"
          labelId="entry-form-category-label"
          label="Category"
          value={form.categoryId}
          onChange={handleChange}
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value={1}>House</MenuItem>
        </Select>
      </FormControl>

      <Button variant="outlined" startIcon={<SaveIcon />}>
        SAVE
      </Button>
    </Stack>
  );
}
