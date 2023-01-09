import { useMediaQuery, useTheme } from '@mui/material';
import { useNavigationItems } from '../../hooks/navigation/use-navigation-items';
import { DesktopNavigation } from './desktop-navigation';
import { DesktopNavigationItem } from './desktop-navigation-item';
import { MobileNavigation } from './mobile-navigation';
import { MobileNavigationItem } from './mobile-navigation-item';

export const Navigation: React.FC = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const navigationItems = useNavigationItems();

  if (isDesktop) {
    return (
      <DesktopNavigation>
        {navigationItems.map(({ href, icon }) => (
          <DesktopNavigationItem key={href} href={href} icon={icon} />
        ))}
      </DesktopNavigation>
    );
  }

  return (
    <MobileNavigation>
      {navigationItems.map(({ href, icon }) => (
        <MobileNavigationItem key={href} href={href} icon={icon} />
      ))}
    </MobileNavigation>
  );
};
