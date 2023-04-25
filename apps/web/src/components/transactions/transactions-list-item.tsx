import { Delete, SyncAlt, TrendingDown, TrendingUp } from '@mui/icons-material';
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
} from '@mui/material';
import { blue, green, red } from '@mui/material/colors';
import { DateFormatter } from '@wallet/utilities/date.utility';
import { TIndex } from '@wallet/utilities/model.utility';
import { useAtomValue } from 'jotai';
import { deletedTransactionAtom } from './transactions.state';

export type TTransactionType = 'income' | 'expense' | 'linked';

const Icon: Record<TTransactionType, JSX.Element> = {
  income: <TrendingUp />,
  expense: <TrendingDown />,
  linked: <SyncAlt />,
};

const color: Record<TTransactionType, string> = {
  income: green[500],
  expense: red[500],
  linked: blue[500],
};

function transactionDateFormat(date: Date): string {
  return new DateFormatter().dateMday().slash().dateMonth().toString();
}

export interface ITransactionsListItemProps {
  id: TIndex;
  amount: string;
  date: Date;
  description: string;
  type: TTransactionType;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const TransactionsListItem: React.FC<ITransactionsListItemProps> = ({
  id,
  amount,
  date,
  description,
  type,
  onEdit,
  onDelete,
}) => {
  const deletedTransaction = useAtomValue(deletedTransactionAtom);
  const isDisabled =
    deletedTransaction.id === id && deletedTransaction.disabled;

  return (
    <ListItem disablePadding>
      <ListItemButton disabled={isDisabled} onClick={onEdit}>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: color[type] }}>{Icon[type]}</Avatar>
        </ListItemAvatar>
        <ListItemText primary={amount} secondary={description} />
        {/* <ListItemText primary={transactionDateFormat(date)} /> */}
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            disabled={isDisabled}
            onClick={(event) => {
              event.stopPropagation();
              onDelete?.();
            }}
          >
            <Delete sx={{ color: red[500] }} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItemButton>
    </ListItem>
  );
};
