import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { TIndexable } from '@wallet/utilities/model.utility';
import { ITransactionReadonly } from '../../models/transaction.model';
import { TransactionsForm } from './transactions-form';
import { TransactionsFormUpdateButton } from './transactions-form-update-button';

function getFormValuesFrom(transaction?: TIndexable<ITransactionReadonly>) {
  const type = transaction?.type;
  const description = transaction?.description;
  const year = undefined;
  const month = undefined;
  const day = undefined;
  const currency = undefined;
  const units = undefined;
  const cents = undefined;

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
  transaction?: TIndexable<ITransactionReadonly>;
}

export const TransactionsEditModal: React.FC<ITransactionsEditModalProps> = ({
  open,
  onClose,
  transaction,
}) => {
  const { type, description, year, month, day, currency, units, cents } =
    getFormValuesFrom(transaction);

  return (
    <Dialog open={open} onClose={onClose} >
      <DialogTitle>Update transaction</DialogTitle>
      <DialogContent>
        {/* <DialogContentText></DialogContentText> */}
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
            <TransactionsFormUpdateButton />
          </Box>
        </TransactionsForm>
      </DialogContent>
    </Dialog>
  );
};
