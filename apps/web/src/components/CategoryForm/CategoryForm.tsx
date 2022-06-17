import { ChangeEvent, useState } from 'react';

import Stack from '@mui/material/Stack';

import { FormControl, TextField } from '../Material';
import SaveButton from '../SaveButton';
import { useAddOneMutation } from '../../hooks/categories';

function validator(value: string) {
  return value.length > 0 && value.length < 256;
}

export default function CategoryForm() {
  const [formData, setFormData] = useState('');
  const [formError, setFormError] = useState(false);

  const { isLoading, isSuccess, isError, data, error, mutate } =
    useAddOneMutation();

  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { value } = event.target;
    setFormData(value);
    setFormError(!validator(value));
  };

  const handleSubmit = () => {
    const isValid = validator(formData);
    setFormError(!isValid);
    if (!isValid) {
      return;
    }

    mutate({
      name: formData,
    });

    setFormData('');
  };

  return (
    <Stack component="form" noValidate spacing={2}>
      <FormControl fullWidth error={formError}>
        <TextField
          required
          id="category-form-name"
          name="name"
          label="Name"
          variant="outlined"
          error={formError}
          value={formData}
          onChange={handleChange}
        />
      </FormControl>

      <SaveButton onClick={handleSubmit} />
    </Stack>
  );
}
