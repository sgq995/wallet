import { Box } from '@mui/material';
import { TIndexable } from '@wallet/utilities/model.utility';
import { ITransactionReadonlyModel } from '../../models/transaction.model';
import { TransactionsForm } from './transactions-form';
import { TransactionsFormUpdateButton } from './transactions-form-update-button';
import { SimpleDialog } from '../common/simple-dialog';

function getFormValuesFrom(transaction: TIndexable<ITransactionReadonlyModel>) {
  const type = transaction.type;
  const description = transaction.description;
  const year = transaction.date.getUTCFullYear().toString();
  const month = transaction.date.getUTCMonth().toString();
  const day = transaction.date.getUTCDate().toString();
  const currency = transaction.cash.currency.id.toString();
  const units = transaction.cash.units.toString();
  const cents = transaction.cash.cents.toString();

  return {
    type,
    description,
    year,
    month,
    day,
    currency,
    units,
    cents,
  };
}

export interface ITransactionsEditDialogProps {
  open: boolean;
  onClose?: () => void;
  transaction?: TIndexable<ITransactionReadonlyModel>;
}

export const TransactionsEditDialog: React.FC<ITransactionsEditDialogProps> = ({
  open,
  onClose,
  transaction,
}) => {
  if (!transaction) {
    return null;
  }

  const { type, description, year, month, day, currency, units, cents } =
    getFormValuesFrom(transaction);

  return (
    <SimpleDialog open={open} onClose={onClose}>
      <TransactionsForm
        type={type}
        description={description}
        year={year}
        month={month}
        day={day}
        currency={currency}
        units={units}
        cents={cents}
      >
        <Box display="flex" alignItems="center">
          <TransactionsFormUpdateButton id={transaction.id} />
        </Box>
      </TransactionsForm>
    </SimpleDialog>
  );
};
