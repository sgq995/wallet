import { Skeleton, Stack } from '@mui/material';
import { Repeat } from '../helpers';
import { AccountsGridItem } from './accounts-grid-item';

export const AccountsGridFallback: React.FC = () => {
  return (
    <Stack>
      <Repeat times={5}>
        <Skeleton>
          <AccountsGridItem label="" balance="" currencyCode="" />
        </Skeleton>
      </Repeat>
    </Stack>
  );
};
