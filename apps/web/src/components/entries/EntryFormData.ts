export interface EntryFormData {
  year: number;
  month: number;
  day: number;
  type: number;
  units: number;
  cents: number;
  currency: number;
  description: string;
  account: number | null;
  category: number | null;
}
