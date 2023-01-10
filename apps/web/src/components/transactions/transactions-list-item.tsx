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

export interface ITransactionsListItemProps {
  amount: string;
  description: string;
  type: TTransactionType;
}

export const TransactionsListItem: React.FC<ITransactionsListItemProps> = ({
  amount,
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
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: color[type] }}>{Icon[type]}</Avatar>
      </ListItemAvatar>
      <ListItemButton>
        <ListItemText primary={amount} secondary={description} />
      </ListItemButton>
    </ListItem>
  );
};
