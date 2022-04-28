import {
  Box,
  Card,
  Divider,
  Paper,
  Stack,
  Typography,
} from '../components/Material';

export default function Web() {
  return (
    <>
      <Typography variant="h1">Home</Typography>

      <Paper variant="outlined">
        <Stack
          padding={2}
          spacing={2}
          direction="row"
          justifyContent="space-between"
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Box flexGrow={3}>
            <Typography variant="body1">Description</Typography>
          </Box>

          <Stack flexGrow={1} flexDirection="column" alignItems="flex-end">
            <Typography variant="body2">100.000.000,00</Typography>
            <Typography variant="body2">2022/04/23</Typography>
          </Stack>
        </Stack>
      </Paper>
    </>
  );
}
