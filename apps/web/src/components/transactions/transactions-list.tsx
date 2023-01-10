import { Delete, SyncAlt, TrendingDown, TrendingUp } from '@mui/icons-material';
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import { blue, green, red } from '@mui/material/colors';
import { useQuery } from 'react-query';
import { TransactionsService } from '../../services';
import { TransactionsListItem } from './transactions-list-item';

export const TransactionsList: React.FC = () => {
  useQuery(['transactions'], ({ signal }) => TransactionsService.find());

  return (
    <List>
      <ListSubheader>2023</ListSubheader>
      
      <ListItem
        secondaryAction={
          <IconButton edge="end">
            <Delete sx={{ color: red[500] }} />
          </IconButton>
        }
      >
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: red[500] }}>
            <TrendingDown />
          </Avatar>
        </ListItemAvatar>
        <ListItemButton>
          <ListItemText
            primary="$ 150.00"
            secondary="Lorem ipsum dolor, sit amet consectetur adipisicing elit."
          />
        </ListItemButton>
      </ListItem>

      <ListItem
        secondaryAction={
          <IconButton edge="end">
            <Delete />
          </IconButton>
        }
      >
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: green[500] }}>
            <TrendingUp />
          </Avatar>
        </ListItemAvatar>
        <ListItemButton>
          <ListItemText
            primary="$ 150.00"
            secondary="Lorem ipsum dolor, sit amet consectetur adipisicing elit."
          />
        </ListItemButton>
      </ListItem>

      <ListItem
        secondaryAction={
          <IconButton edge="end">
            <Delete />
          </IconButton>
        }
      >
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: blue[500] }}>
            <SyncAlt />
          </Avatar>
        </ListItemAvatar>
        <ListItemButton>
          <ListItemText
            primary="$ 150.00"
            secondary="Lorem ipsum dolor, sit amet consectetur adipisicing elit."
          />
        </ListItemButton>
      </ListItem>

      <TransactionsListItem
        amount="$ 150.00"
        description="Lorem"
        type="income"
      />

      <TransactionsListItem
        amount="$ 250.00"
        description="Lorem"
        type="expense"
      />

      <TransactionsListItem
        amount="$ 1000.00"
        description="Lorem ipsum"
        type="linked"
      />
    </List>
  );
};
