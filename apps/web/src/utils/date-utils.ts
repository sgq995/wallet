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

class DateFormatter {
  private buffer: string = '';

  constructor(private date: Date = new Date(), private utc: boolean = false) {}

  hyphen() {
    this.buffer += '-';
    return this;
  }

  slash() {
    this.buffer += '/';
    return this;
  }

  get day() {
    if (this.utc) {
      return this.date.getUTCDate();
    }
    return this.date.getDate();
  }

  get month() {
    if (this.utc) {
      return this.date.getUTCMonth();
    }
    return this.date.getMonth();
  }

  get fullYear() {
    if (this.utc) {
      return this.date.getUTCFullYear();
    }
    return this.date.getFullYear();
  }

  D() {
    this.buffer += this.day.toString();
    return this;
  }

  DD() {
    this.buffer += this.day.toString().padStart(2, '0');
    return this;
  }

  M() {
    this.buffer += this.month.toString();
    return this;
  }

  MM() {
    this.buffer += (this.month + 1).toString().padStart(2, '0');
    return this;
  }

  YY() {
    this.buffer += this.fullYear.toString().slice(-2);
    return this;
  }

  YYYY() {
    this.buffer += this.fullYear.toString();
    return this;
  }

  format(formatter: (date: Date) => string) {
    this.buffer += formatter(this.date);
    return this;
  }

  toString() {
    const str = this.buffer;
    this.buffer = '';
    return str;
  }
}

export function format(date: Date) {
  return new DateFormatter(date);
}
