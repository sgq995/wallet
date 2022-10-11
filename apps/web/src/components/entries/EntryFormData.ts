export interface EntryFormData {
  year: string;
  month: string;
  day: string;
  type: number;
  units: number;
  cents: number;
  currency: number;
  description: string;
  account: number | null;
  category: number | null;
}
