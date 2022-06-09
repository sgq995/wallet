import { ChangeEvent, useState } from 'react';

import { Button, SelectChangeEvent, Stack } from '@mui/material';

import { Save as SaveIcon } from '@mui/icons-material';
import {
  IFormControlState,
  IFormErrorState,
  IFormFilters,
  IFormValidators,
} from './types';
import { MONTH_LIST } from './common';
import EntryFormDate, {
  dayFilter,
  dayValidator,
  monthFilter,
  monthValidator,
  yearFilter,
  yearValidator,
} from './EntryFormDate';
import EntryFormDescription, {
  descriptionFilter,
  descriptionValidator,
} from './EntryFormDescription';
import EntryFormAmount, {
  amountFilter,
  amountValidator,
} from './EntryFormAmount';
import EntryFormType, { typeIdFilter, typeIdValidator } from './EntryFormType';
import EntryFormAccount, {
  accountIdFilter,
  accountIdValidator,
} from './EntryFormAccount';
import EntryFormCategory, {
  categoryIdFilter,
  categoryIdValidator,
} from './EntryFormCategory';
import { useAddOneMutation } from '../../hooks/entries';

const filters: IFormFilters = {
  description: descriptionFilter,
  amount: amountFilter,
  day: dayFilter,
  month: monthFilter,
  year: yearFilter,
  typeId: typeIdFilter,
  accountId: accountIdFilter,
  categoryId: categoryIdFilter,
};

const validators: IFormValidators = {
  description: descriptionValidator,
  amount: amountValidator,
  day: dayValidator,
  month: monthValidator,
  year: yearValidator,
  typeId: typeIdValidator,
  accountId: accountIdValidator,
  categoryId: categoryIdValidator,
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

export default function EntryForm() {
  const [formData, setFormData] = useState<IFormControlState>({
    description: '',
    amount: '',
    day: new Date().getDate().toString(),
    month: MONTH_LIST[new Date().getMonth()],
    year: new Date().getFullYear().toString(),
    typeId: '',
    accountId: '',
    categoryId: '',
  });
  // const [warning, setWarning] = useState<IFormErrorState>({});
  const [formError, setFormError] = useState<IFormErrorState>({});

  const { isLoading, isSuccess, isError, data, error, mutate } =
    useAddOneMutation();

  const applyFormChange = (name: string, rawValue: string) => {
    const value =
      typeof filters[name] === 'function' ? filters[name](rawValue) : rawValue;

    const isValid =
      typeof validators[name] === 'function' ? validators[name](value) : true;

    setFormData((prevForm) => {
      return {
        ...prevForm,
        [name]: value,
      };
    });
    setFormError((prevError) => {
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
    applyFormChange(name, value);
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
    const required = ['amount', 'day', 'month', 'year', 'typeId'];
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

    // const year = parseInt(formData.year);
    // const month = MONTH_LIST.indexOf(formData.month);
    // const day = parseInt(formData.day);

    const year = formData.year;
    const month = (MONTH_LIST.indexOf(formData.month) + 1)
      .toString()
      .padStart(2, '0');
    const day = formData.day.padStart(2, '0');

    const amount = parseFloat(formData.amount);
    const typeId = parseInt(formData.typeId);
    const date = `${year}-${month}-${day}`;

    mutate({
      amount,
      typeId,
      date,
    });
  };

  return (
    <Stack component="form" noValidate spacing={2}>
      <EntryFormDate
        form={formData}
        error={formError}
        handleChange={handleChange}
      />

      <EntryFormAmount
        form={formData}
        error={formError}
        handleChange={handleChange}
      />

      <EntryFormType
        form={formData}
        error={formError}
        handleChange={handleChange}
      />

      <EntryFormDescription
        form={formData}
        error={formError}
        handleChange={handleChange}
      />

      <EntryFormAccount
        form={formData}
        error={formError}
        handleChange={handleChange}
      />

      <EntryFormCategory
        form={formData}
        error={formError}
        handleChange={handleChange}
      />

      <Button
        type="button"
        variant="outlined"
        startIcon={<SaveIcon />}
        onClick={handleSubmit}
      >
        SAVE
      </Button>
    </Stack>
  );
}
