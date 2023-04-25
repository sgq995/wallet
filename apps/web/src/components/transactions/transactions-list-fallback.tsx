import { Delete } from '@mui/icons-material';
import { Avatar, Skeleton, Stack } from '@mui/material';
import { Repeat } from '../common';

export const TransactionsListFallback: React.FC = () => {
  return (
    <Stack direction="column" gap={2}>
      <Repeat times={5}>
        <Stack direction="row" gap={2} alignItems="center">
          <Skeleton variant="circular">
            <Avatar />
          </Skeleton>
          <Stack direction="column" flexGrow={1}>
            <Skeleton variant="text" />
            <Skeleton variant="text" />
          </Stack>
          <Skeleton variant="circular">
            <Delete />
          </Skeleton>
        </Stack>
      </Repeat>
    </Stack>
  );
};
