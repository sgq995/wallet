import { BottomNavigationAction } from '@mui/material';
import Link from 'next/link';
import { INavigationItem } from '../../hooks/navigation/use-navigation-items';

export const MobileNavigationItem: React.FC<INavigationItem> = ({
  href,
  icon,
}) => {
  return <BottomNavigationAction component={Link} href={href} icon={icon} />;
};
