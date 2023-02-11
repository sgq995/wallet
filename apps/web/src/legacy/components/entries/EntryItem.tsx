import { MouseEventHandler } from 'react';
import { useMediaQuery } from '@mui/material';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
import type { IconButtonProps } from '@mui/material/IconButton';

import type { TEntryModel } from '@wallet/schemas/legacy/entries';

import { Hidden, IconButton, ListItem, ListItemText } from '@mui/material';
import { DeleteIcon } from '../../components/IconsMaterial';

import { yyyyMMdd } from '../../utilities/date.utility';
import { transactionToAmount } from './utils';
import { useSystemContext } from '../../contexts/system';

import theme from '../../theme';

export interface IEntryItemProps {
  entry: TEntryModel;
  onEdit: MouseEventHandler<HTMLDivElement>;
  onDelete: IconButtonProps['onClick'];
}

export const EntryItem: React.FC<IEntryItemProps> = ({
  entry,
  onEdit,
  onDelete,
}) => {
  const hasInset = useMediaQuery(theme.breakpoints.up('sm'));

  const { entryTypes } = useSystemContext();
  const typeName = entryTypes.find(({ id }) => id === entry.typeId)?.name;

  return (
    <ListItem
      sx={{ justifyContent: 'space-arround' }}
      button
      onClick={onEdit}
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={(event) => {
            event.stopPropagation();
            onDelete(event);
          }}
        >
          <DeleteIcon color="error" />
        </IconButton>
      }
      divider
    >
      <Hidden smDown>
        <ListItemText sx={{ flexGrow: 0 }} secondary={yyyyMMdd(entry.date)} />
      </Hidden>
      <ListItemText
        sx={{ minWidth: '60%', maxWidth: '60%', width: '60%' }}
        inset={hasInset}
        primary={entry.description}
        secondary={typeName}
      />
      <ListItemText
        inset
        primary={transactionToAmount(entry.transaction)}
        primaryTypographyProps={{ variant: 'body2' }}
        secondary={entry.transaction.currency.code}
        secondaryTypographyProps={{ variant: 'body2' }}
      />
    </ListItem>
  );
};
