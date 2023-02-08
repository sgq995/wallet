export type TTransactionsStore = {
  year: number;
  month: number;
  day: number;
  type: 'income' | 'expense';
  currency: number;
  units: number;
  cents: number;
  description: string;
};
