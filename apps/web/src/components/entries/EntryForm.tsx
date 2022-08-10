import { useNotificationSystem } from '../../contexts/notifications';
import { useAddOneMutation, useUpdateOneMutation } from '../../hooks/entries';
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
import { Stack } from '@mui/material';

import type { TEntryModel } from 'schemas/entries';
import { format } from '../../utils/date-utils';

interface EntryFormProps {
  entry?: TEntryModel;
}

export default function EntryForm({ entry }: EntryFormProps) {
  const { success: notifySuccess, error: notifyError } =
    useNotificationSystem();

  const { mutate: addOne } = useAddOneMutation();
  const { mutate: updateOne } = useUpdateOneMutation();

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

    if (entry) {
      updateOne(
        {
          id: entry.id,
          body: {
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
        },
        {
          onSuccess: () => {
            notifySuccess('Entry was updated');
          },
          onError: () => {
            notifyError('Something goes wrong');
          },
        }
      );
    } else {
      addOne(
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
    }
  };

  const currentDate = format(new Date())
    .YYYY()
    .hyphen()
    .MM()
    .hyphen()
    .DD()
    .toString();
  const defaultDate = new Date(entry?.date ?? currentDate);

  return (
    <Form
      initialState={{
        year: defaultDate.getUTCFullYear().toString(),
        month: (defaultDate.getUTCMonth() + 1).toString(),
        day: defaultDate.getUTCDate().toString(),
        type: entry?.typeId.toString() ?? '',
        units: entry?.transaction.units.toString() ?? '0',
        cents: entry?.transaction.cents.toString() ?? '0',
        currency: entry?.transaction.currencyId.toString() ?? '',
        description: entry?.description ?? '',
        account: entry?.accountId?.toString() ?? '',
        category: entry?.categoryId?.toString() ?? '',
      }}
    >
      <Stack direction="column" spacing={2}>
        <Stack direction="row" spacing={2}>
          <FormDateField required={!entry} fullWidth />
        </Stack>

        <Stack direction="row" spacing={2}>
          <FormAmountField required={!entry} fullWidth />
        </Stack>

        <FormEntryTypeField required={!entry} fullWidth />

        <FormDescriptionField fullWidth />

        <FormAccountField fullWidth id="entry-account" />

        <FormCategoryField fullWidth />

        <FormSubmitButton
          disabledOnError
          resetOnSubmit={!entry}
          onClick={handleSubmit}
        />
      </Stack>
    </Form>
  );
}
