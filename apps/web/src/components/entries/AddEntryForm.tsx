import { useAddOneMutation } from '../../hooks/entries';
import { FormAccountField, FormAmountField, IFormState } from '../forms';
import Form from '../forms/Form';
import FormCategoryField from '../forms/FormCategoryField';
import FormDateField from '../forms/FormDateField';
import FormDescriptionField from '../forms/FormDescriptionField';
import FormEntryTypeField from '../forms/FormEntryTypeField';
import FormSubmitButton from '../forms/FormSubmitButton';
import { Stack } from '../Material';

export default function AddEntryForm() {
  const { mutate } = useAddOneMutation();

  const handleSubmit = ({ data }: IFormState) => {
    const year = data['year'];
    const month = data['month'].padStart(2, '0');
    const day = data['day'].padStart(2, '0');
    const date = `${year}-${month}-${day}`;
    const typeId = parseInt(data['type']);
    const units = parseInt(data['units']);
    const cents = parseInt(data['cents']);
    const currencyId = parseInt(data['currency']);
    const description = data['description'];
    const accountId = parseInt(data['accountId']);
    const categoryId = parseInt(data['categoryId']);

    mutate({
      date,
      typeId,
      transaction: {
        units,
        cents,
        currencyId,
      },
      description,
      accountId,
      categoryId,
    });
    console.log({ data });
  };

  return (
    <Form
      initialState={{
        units: '0',
        cents: '0',
        account: '',
        year: '',
        month: '',
        day: '',
      }}
    >
      <Stack direction="column" spacing={2}>
        <Stack direction="row" spacing={2}>
          <FormDateField required fullWidth />
        </Stack>

        <Stack direction="row" spacing={2}>
          <FormAmountField required fullWidth />
        </Stack>

        <FormEntryTypeField required fullWidth />

        <FormDescriptionField fullWidth />

        <FormAccountField fullWidth id="entry-account" />

        <FormCategoryField fullWidth />

        <FormSubmitButton disabledOnError onClick={handleSubmit} />
      </Stack>
    </Form>
  );
}
