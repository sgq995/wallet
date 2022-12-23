import { ListItem, ListItemButton, ListItemIcon } from '@mui/material';
import Link from 'next/link';
import { INavigationItem } from '../../hooks/navigation/use-navigation-items';

export const DesktopNavigationItem: React.FC<INavigationItem> = ({
  href,
  icon,
}) => {
  return (
    <ListItem disableGutters>
      <ListItemButton component={Link} href={href}>
        <ListItemIcon sx={{ minWidth: 0 }}>{icon}</ListItemIcon>
      </ListItemButton>
    </ListItem>
  );
};
