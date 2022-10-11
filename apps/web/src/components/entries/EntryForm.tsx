import { Stack } from '@mui/material';

import type { Request, TEntryModel } from 'schemas/entries';

import {
  Form,
  FormAccountField,
  FormAmountField,
  FormCategoryField,
  FormDateField,
  FormDescriptionField,
  FormEntryTypeField,
  FormSubmitButton,
} from '../forms';

import { useAddOneMutation, useUpdateOneMutation } from '../../hooks/entries';
import { useNotificationSystem } from '../../contexts/notifications';
import { format } from '../../utils/date-utils';

import { EntryFormData } from './EntryFormData';

function getUpdateDelta(
  data: EntryFormData,
  entry?: TEntryModel
): Request.TUpdateOne {
  const {
    year,
    month,
    day,
    type: typeId,
    units,
    cents,
    currency: currencyId,
    description,
    account: accountId,
    category: categoryId,
  } = data;
  const date = `${year}-${month}-${day}`;

  const delta: Request.TUpdateOne = {
    date: date !== entry?.date ? date : undefined,
    typeId: typeId !== entry?.typeId ? typeId : undefined,
    transaction: {
      units: units !== entry?.transaction.units ? units : undefined,
      cents: cents !== entry?.transaction.cents ? cents : undefined,
      currencyId:
        currencyId !== entry?.transaction.currencyId ? currencyId : undefined,
    },
    description: description !== entry.description ? description : undefined,
    accountId: accountId !== entry.accountId ? accountId : undefined,
    categoryId: categoryId !== entry.categoryId ? categoryId : undefined,
  };

  return delta;
}

export interface EntryFormProps {
  entry?: TEntryModel;
}

export default function EntryForm({ entry }: EntryFormProps) {
  const { success: notifySuccess, error: notifyError } =
    useNotificationSystem();

  const { mutate: addOne } = useAddOneMutation();
  const { mutate: updateOne } = useUpdateOneMutation();

  const handleSubmit = (data: EntryFormData) => {
    const {
      year,
      month,
      day,
      type: typeId,
      units,
      cents,
      currency: currencyId,
      description,
      account: accountId,
      category: categoryId,
    } = data;
    const date = `${year}-${month}-${day}`;

    if (entry) {
      const delta = getUpdateDelta(data, entry);

      updateOne(
        {
          id: entry.id,
          body: delta,
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
