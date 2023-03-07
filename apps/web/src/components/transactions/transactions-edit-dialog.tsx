import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { DateFormatter } from '@wallet/utilities/date.utility';
import { TIndexable } from '@wallet/utilities/model.utility';
import { ITransactionReadonlyModel } from '../../models/transaction.model';
import { TransactionsForm } from './transactions-form';
import { TransactionsFormUpdateButton } from './transactions-form-update-button';

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

export interface ITransactionsEditModalProps {
  open: boolean;
  onClose?: () => void;
  transaction?: TIndexable<ITransactionReadonlyModel>;
}

export const TransactionsEditModal: React.FC<ITransactionsEditModalProps> = ({
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
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update transaction</DialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>
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
      </DialogContent>
    </Dialog>
  );
};
