import {
  Box,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '../components/Material';
import { yyyyMMdd } from '../utils/date-utils';
import { DeleteIcon } from './IconsMaterial';

interface EntryPaperProps {
  description: string;
  amount: number;
  date: string | Date;
}

export default function EntryPaper({
  description,
  amount,
  date,
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
          <Typography variant="body2">{amount}</Typography>
          <Typography variant="body2">{yyyyMMdd(date)}</Typography>
        </Stack>

        <Box display="flex" alignItems="center">
          <IconButton>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      </Stack>
    </Paper>
  );
}
