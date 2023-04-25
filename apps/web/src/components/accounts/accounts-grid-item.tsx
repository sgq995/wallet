import { Delete } from '@mui/icons-material';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { TIndex } from '@wallet/utilities/model.utility';
import { useAtomValue } from 'jotai';
import { deletedAccountAtom } from './accounts.state';

export interface IAccountsGridItemProps {
  id: TIndex;
  label: string;
  balance: string;
  currencyCode: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const AccountsGridItem: React.FC<IAccountsGridItemProps> = ({
  id,
  label,
  balance,
  currencyCode,
  onEdit,
  onDelete,
}) => {
  const deletedAccount = useAtomValue(deletedAccountAtom);
  const isDisabled = deletedAccount.id === id && deletedAccount.disabled;

  return (
    <Grid item xs={12} sm={12} md={6} lg={4}>
      <Card variant="outlined">
        <CardActionArea>
          <CardContent>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {label}
            </Typography>
            <Typography variant="h3" component="span">
              {balance}
            </Typography>
            <Typography color="text.secondary">{currencyCode}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions disableSpacing>
          <Button disabled={isDisabled} onClick={onEdit}>
            Edit
          </Button>

          <Button
            sx={{ ml: 'auto' }}
            endIcon={<Delete />}
            color="error"
            disabled={isDisabled}
            onClick={onDelete}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
