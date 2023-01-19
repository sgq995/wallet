import { Delete, SyncAlt, TrendingDown, TrendingUp } from '@mui/icons-material';
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { blue, green, red } from '@mui/material/colors';
import { DateFormatter } from '@wallet/utilities';

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
  amount: string;
  date: Date;
  description: string;
  type: TTransactionType;
}

export const TransactionsListItem: React.FC<ITransactionsListItemProps> = ({
  amount,
  date,
  description,
  type,
}) => {
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end">
          <Delete sx={{ color: red[500] }} />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton alignItems="flex-start">
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: color[type] }}>{Icon[type]}</Avatar>
        </ListItemAvatar>
        <ListItemText primary={amount} secondary={description} />
        <ListItemText
          sx={{ ml: 'auto', flexGrow: 0 }}
          primary={transactionDateFormat(date)}
        />
      </ListItemButton>
    </ListItem>
  );
};
