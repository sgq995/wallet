export interface ITimePeriod {
  periodicity:
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'quarterly'
    | 'semerter'
    | 'yearly';
  when: number | 'begin' | 'end';
}
