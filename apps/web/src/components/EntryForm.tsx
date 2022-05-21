import { ChangeEvent, ChangeEventHandler, useState } from 'react';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from '@mui/material';

// import { Box, Stack } from '../components/Material';

import { TEntryModel } from '../services/entries';

interface IFormControlState {
  description?: string;
  amount?: string;
  day?: string;
  month?: string;
  year?: string;
  typeId?: string;
  accountId?: string;
  categoryId?: string;
}

type ConvertKeyTo<T, R> = { [K in keyof T]: R };

interface IFormErrorState extends ConvertKeyTo<IFormControlState, boolean> {}

type Filter = (value: string) => string;

interface IFormFilters extends ConvertKeyTo<IFormControlState, Filter> {}

type Validator = (value: string) => boolean;

interface IFormValidators extends ConvertKeyTo<IFormControlState, Validator> {}

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

    return `${value}.${decimal}`;
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
  const [form, setForm] = useState<IFormControlState>({});
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

  const handleTextfieldChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    formChange(name, value);
  };

  const handleSelectChange = (
    event: SelectChangeEvent<string>,
    child: React.ReactNode
  ) => {
    const { name, value } = event.target;
    formChange(name, value);
  };

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
          onChange={handleTextfieldChange}
        />
      </FormControl>

      <FormControl fullWidth>
        <TextField
          required
          inputMode="numeric"
          id="entry-form-amount"
          name="amount"
          label="Amount"
          variant="outlined"
          value={form.amount}
          onChange={handleTextfieldChange}
        />
      </FormControl>

      <Stack direction="row" spacing={2}>
        <FormControl fullWidth>
          <InputLabel id="entry-select-day">Day</InputLabel>
          <Select
            required
            id="entry-form-day"
            name="day"
            labelId="entry-select-day"
            label="Day"
            value={form.day}
            onChange={handleSelectChange}
          ></Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="entry-select-month">Month</InputLabel>
          <Select
            required
            id="entry-form-month"
            name="month"
            labelId="entry-select-month"
            label="Month"
            value={form.month}
            onChange={handleSelectChange}
          ></Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="entry-select-year">Year</InputLabel>
          <Select required labelId="entry-select-year" label="Year"></Select>
        </FormControl>
      </Stack>

      <FormControl fullWidth required>
        <InputLabel id="entry-select-type">Type</InputLabel>
        <Select required labelId="entry-select-type" label="Type">
          <MenuItem value={1}>Income</MenuItem>
          <MenuItem value={2}>Expense</MenuItem>
          <MenuItem value={3}>Asset</MenuItem>
          <MenuItem value={4}>Liability</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="entry-select-account">Account</InputLabel>
        <Select required labelId="entry-select-account" label="Account">
          <MenuItem value={1}>Davivienda</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="entry-select-category">Category</InputLabel>
        <Select required labelId="entry-select-category" label="Category">
          <MenuItem value={1}>House</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}
