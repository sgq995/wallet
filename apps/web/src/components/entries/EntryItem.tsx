import type { IconButtonProps } from '@mui/material/IconButton';

import currency from 'currency.js';

import type { TEntryModel } from 'schemas/entries';

import {
  Box,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '../../components/Material';
import { DeleteIcon } from '../../components/IconsMaterial';

import { yyyyMMdd } from '../../utils/date-utils';
import { transactionToAmount } from './utils';

interface IEntryItemProps extends TEntryModel {
  onDelete: IconButtonProps['onClick'];
}

export default function EntryItem({
  description,
  transaction,
  date,
  onDelete,
}: IEntryItemProps) {
  return (
    <ListItem
      sx={{ justifyContent: 'space-arround' }}
      button
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={onDelete}>
          <DeleteIcon color="error" />
        </IconButton>
      }
      divider
    >
      <ListItemText
        sx={{ maxWidth: '70%', width: '70%' }}
        inset
        primary={description}
        secondary={yyyyMMdd(date)}
      />
      <ListItemText
        inset
        primary={transactionToAmount(transaction)}
        primaryTypographyProps={{ variant: 'body2' }}
        secondary={transaction.currency.code}
        secondaryTypographyProps={{ variant: 'body2' }}
      />
    </ListItem>
  );
}
