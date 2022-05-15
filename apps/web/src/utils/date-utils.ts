function yyyy(year: number) {
  return year.toString().padStart(4, '0');
}

function MM(month: number) {
  return (month + 1).toString().padStart(2, '0');
}

function dd(day: number) {
  return day.toString().padStart(2, '0');
}

export function yyyyMMdd(date: string | Date) {
  const dateObj = new Date(date);
  const year = yyyy(dateObj.getUTCFullYear());
  const month = MM(dateObj.getUTCMonth());
  const day = dd(dateObj.getUTCDate());
  return `${year}/${month}/${day}`;
}
