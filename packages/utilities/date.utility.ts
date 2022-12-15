// https://www.rfc-editor.org/rfc/rfc3339#section-5.6
export class DateFormatter {
  private _buffer: string[] = [];

  private _day: () => number;
  private _month: () => number;
  private _monthIndex: () => number;
  private _fullYear: () => number;

  private _hours: () => number;
  private _minutes: () => number;
  private _seconds: () => number;
  private _millis: () => number;
  private _offset: () => number;

  constructor(private _date: Date = new Date(), private _utc: boolean = false) {
    this._day = _utc ? _date.getUTCDate.bind(_date) : _date.getDate.bind(_date);
    this._month = () => this._monthIndex() + 1;
    this._monthIndex = _utc
      ? _date.getUTCMonth.bind(_date)
      : _date.getMonth.bind(_date);
    this._fullYear = _utc
      ? _date.getUTCFullYear.bind(_date)
      : _date.getFullYear.bind(_date);

    this._hours = _utc
      ? _date.getUTCHours.bind(_date)
      : _date.getHours.bind(_date);
    this._minutes = _utc
      ? _date.getUTCMinutes.bind(_date)
      : _date.getMinutes.bind(_date);
    this._seconds = _utc
      ? _date.getUTCSeconds.bind(_date)
      : _date.getSeconds.bind(_date);
    this._millis = _utc
      ? _date.getUTCMilliseconds.bind(_date)
      : _date.getMilliseconds.bind(_date);
    this._offset = _utc ? () => 0 : _date.getTimezoneOffset.bind(_date);
  }

  dot() {
    this._buffer.push('.');
    return this;
  }

  plus() {
    this._buffer.push('+');
    return this;
  }

  minus() {
    this._buffer.push('-');
    return this;
  }

  colon() {
    this._buffer.push(':');
    return this;
  }

  hyphen() {
    this._buffer.push('-');
    return this;
  }

  slash() {
    this._buffer.push('/');
    return this;
  }

  T() {
    this._buffer.push('T');
    return this;
  }

  Z() {
    this._buffer.push('Z');
    return this;
  }

  dateFullYear() {
    this._buffer.push(this._fullYear().toString().padStart(4, '0'));
    return this;
  }

  dateMonth() {
    this._buffer.push(this._month().toString().padStart(2, '0'));
    return this;
  }

  dateMday() {
    this._buffer.push(this._day().toString().padStart(2, '0'));
    return this;
  }

  timeHour() {
    this._buffer.push(this._hours().toString().padStart(2, '0'));
    return this;
  }

  timeMinute() {
    this._buffer.push(this._minutes().toString().padStart(2, '0'));
    return this;
  }

  timeSecond() {
    this._buffer.push(this._seconds().toString().padStart(2, '0'));
    return this;
  }

  timeSecFrac() {
    this.dot();
    this._buffer.push(this._millis().toString());
    return this;
  }

  timeNumOffset() {
    const offset = this._offset();
    if (offset < 0) {
      this.minus();
    } else {
      this.plus();
    }

    const hours = Math.floor(offset / 60);
    const minutes = offset % 60;

    this._buffer.push(hours.toString().padStart(2, '0'));
    this.colon();
    this._buffer.push(minutes.toString().padStart(2, '0'));
    return this;
  }

  timeOffset(withNumOffset: boolean = false) {
    if (withNumOffset) {
      return this.timeNumOffset();
    }
    return this.Z();
  }

  partialTime(withFrac: boolean = false) {
    this.timeHour().colon().timeMinute().colon().timeSecond();
    if (withFrac) {
      this.timeSecFrac();
    }
    return this;
  }

  fullDate() {
    return this.dateFullYear().hyphen().dateMonth().hyphen().dateMday();
  }

  fullTime() {
    return this.partialTime().timeOffset(!this._utc);
  }

  dateTime() {
    return this.fullDate().T().fullTime();
  }

  custom(formatter: (date: Date) => string) {
    this._buffer.push(formatter(this._date));
    return this;
  }

  toString() {
    const result = this._buffer.join('');
    this._buffer = [];
    return result;
  }
}

export function dateTime(date: Date, utc: boolean = false): string {
  const formatter = new DateFormatter(date, utc);
  return formatter.dateTime().toString();
}
