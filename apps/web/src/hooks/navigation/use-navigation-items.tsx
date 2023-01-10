import {
  WifiOutlined as WifiIcon,
  HomeOutlined as HomeIcon,
  AccountBalanceOutlined as AccountBalanceIcon,
  BalanceOutlined as BalanceIcon,
  CurrencyExchangeOutlined as CurrencyExchangeIcon,
  TimelineOutlined as TimelineIcon,
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
    // { href: '/balance', icon: <BalanceIcon /> },
    // { href: '/flow', icon: <CurrencyExchangeIcon /> },
  ];
}
