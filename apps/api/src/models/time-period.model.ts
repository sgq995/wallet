export interface ITimePeriodModel {
  periodicity:
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'quarterly'
    | 'semerter'
    | 'yearly';
  when: number | 'begin' | 'end';
}
