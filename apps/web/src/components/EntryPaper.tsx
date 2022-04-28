import {
  Box,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '../components/Material';
import { DeleteIcon } from './IconsMaterial';

export default function EntryPaper({}) {
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
          <Typography variant="body1">
            A very long description with a lot of detail about this entry and
            everything related to it
          </Typography>
        </Box>

        <Stack
          flexGrow={1}
          flexDirection="column"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Typography variant="body2">100.000.000,00</Typography>
          <Typography variant="body2">2022/04/23</Typography>
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
