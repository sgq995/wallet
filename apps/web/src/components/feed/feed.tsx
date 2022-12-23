import { Wifi as WifiIcon } from '@mui/icons-material';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Stack,
  Typography,
} from '@mui/material';

export const Feed: React.FC = () => {
  return (
    <Stack>
      <List>
        <ListSubheader>Recent Activity</ListSubheader>
        <ListItem>
          <ListItemIcon sx={{ minWidth: 0 }}>
            <WifiIcon />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="body1">Internet Bill</Typography>}
            secondary={<Typography variant="body2">Successfuly</Typography>}
          />
        </ListItem>
      </List>
    </Stack>
  );
};
