import {
  Wifi as WifiIcon,
  Home as HomeIcon,
  AccountBalance as AccountBalanceIcon,
  Balance as BalanceIcon,
  CurrencyExchange as CurrencyExchangeIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material';

export interface INavigationItem {
  href: string;
  icon: JSX.Element;
}

export function useNavigationItems(): INavigationItem[] {
  return [
    { href: '/', icon: <HomeIcon /> },
    { href: '/timeline', icon: <TimelineIcon /> },
    { href: '/accounts', icon: <AccountBalanceIcon /> },
    { href: '/balance', icon: <BalanceIcon /> },
    { href: '/flow', icon: <CurrencyExchangeIcon /> },
  ];
}
