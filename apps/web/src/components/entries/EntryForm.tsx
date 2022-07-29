import { useNotificationSystem } from '../../contexts/notifications';
import { useAddOneMutation } from '../../hooks/entries';
import {
  Form,
  FormAccountField,
  FormAmountField,
  FormCategoryField,
  FormDateField,
  FormDescriptionField,
  FormEntryTypeField,
  FormSubmitButton,
  IFormState,
} from '../forms';
import { Stack } from '../Material';

export default function EntryForm() {
  const { success: notifySuccess, error: notifyError } =
    useNotificationSystem();
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

    mutate(
      {
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
      },
      {
        onSuccess: () => {
          notifySuccess('Entry was created');
        },
        onError: () => {
          notifyError('Something goes wrong');
        },
      }
    );
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

        <FormSubmitButton
          disabledOnError
          resetOnSubmit
          onClick={handleSubmit}
        />
      </Stack>
    </Form>
  );
}
