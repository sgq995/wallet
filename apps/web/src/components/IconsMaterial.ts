import dynamic from 'next/dynamic';

export const HomeIcon = dynamic(() => import('@mui/icons-material/Home'));

export const AccountsIcon = dynamic(
  () => import('@mui/icons-material/AccountBalance')
);

export const BalanceSheetIcon = dynamic(
  () => import('@mui/icons-material/Balance')
);

export const CashFlowIcon = dynamic(
  () => import('@mui/icons-material/CurrencyExchange')
);

export const AddIcon = dynamic(() => import('@mui/icons-material/Add'));

export const DeleteIcon = dynamic(() => import('@mui/icons-material/Delete'));
