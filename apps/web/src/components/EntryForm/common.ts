export const MONTH_LIST = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const YEAR_LIST = new Array(new Date().getFullYear() - 2000 + 1)
  .fill(0)
  .map((_, index) => (2000 + index).toString());
