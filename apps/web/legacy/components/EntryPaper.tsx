import type { IconButtonProps } from '@mui/material/IconButton';
import {
  Box,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { yyyyMMdd } from '../utilities/date.utility';
import { DeleteIcon } from './IconsMaterial';

interface EntryPaperProps {
  description: string;
  units: number;
  cents: number;
  date: string | Date;
  onDelete: IconButtonProps['onClick'];
}

export default function EntryPaper({
  description,
  units,
  cents,
  date,
  onDelete,
}: EntryPaperProps) {
  return (
    <Paper variant="outlined">
      <Stack
        padding={2}
        spacing={2}
        direction="row"
        justifyContent="space-between"
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Box
          flexGrow={3}
          maxHeight="3em"
          overflow="hidden"
          sx={{ wordWrap: 'break-word' }}
        >
          <Typography variant="body1">{description}</Typography>
        </Box>

        <Stack
          flexGrow={1}
          flexDirection="column"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Typography variant="body2">
            {units}.{cents}
          </Typography>
          <Typography variant="body2">{yyyyMMdd(date)}</Typography>
        </Stack>

        <Box display="flex" alignItems="center">
          <IconButton onClick={onDelete}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      </Stack>
    </Paper>
  );
}
