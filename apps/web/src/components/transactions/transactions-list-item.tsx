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
import { MouseEvent } from 'react';
import { useDeleteTransaction } from '../../hooks/transactions/use-delete-transaction';

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
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

export const TransactionsListItem: React.FC<ITransactionsListItemProps> = ({
  id,
  amount,
  date,
  description,
  type,
  onClick,
}) => {
  const { isLoading, isSuccess, mutate } = useDeleteTransaction();
  const isDisabled = isLoading || isSuccess;

  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    mutate(id);
    event.stopPropagation();
  };

  return (
    <ListItem disablePadding>
      <ListItemButton disabled={isDisabled} onClick={onClick}>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: color[type] }}>{Icon[type]}</Avatar>
        </ListItemAvatar>
        <ListItemText primary={amount} secondary={description} />
        {/* <ListItemText primary={transactionDateFormat(date)} /> */}
        <ListItemSecondaryAction>
          <IconButton edge="end" disabled={isDisabled} onClick={handleDelete}>
            <Delete sx={{ color: red[500] }} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItemButton>
    </ListItem>
  );
};
