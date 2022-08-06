import { useMediaQuery } from '@mui/material';
import type { IconButtonProps } from '@mui/material/IconButton';

import type { TEntryModel } from 'schemas/entries';

import {
  Hidden,
  IconButton,
  ListItem,
  ListItemText,
} from '../../components/Material';
import { DeleteIcon } from '../../components/IconsMaterial';

import { yyyyMMdd } from '../../utils/date-utils';
import { transactionToAmount } from './utils';
import { useSystemContext } from '../../contexts/system';

import theme from '../../theme';

interface IEntryItemProps extends TEntryModel {
  onDelete: IconButtonProps['onClick'];
}

export default function EntryItem({
  typeId,
  description,
  transaction,
  date,
  onDelete,
}: IEntryItemProps) {
  const hasInset = useMediaQuery(theme.breakpoints.up('sm'));

  const { entryTypes } = useSystemContext();
  const typeName = entryTypes.find(({ id }) => id === typeId)?.name;

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
      <Hidden smDown>
        <ListItemText sx={{ flexGrow: 0 }} secondary={yyyyMMdd(date)} />
      </Hidden>
      <ListItemText
        sx={{ minWidth: '60%', maxWidth: '60%', width: '60%' }}
        inset={hasInset}
        primary={description}
        secondary={typeName}
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