import { useEffect, useState } from 'react';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from '@mui/material';

import { Stack } from '../Material';

import { EntryFormComponentProps } from './types';
import { MONTH_LIST, YEAR_LIST } from './common';

function isLeapYear(year: number): boolean {
  if (year % 4 !== 0) {
    return false;
  }

  if (year % 100 !== 0) {
    return true;
  }

  if (year % 400 !== 0) {
    return false;
  }

  return true;
}

function getDaysPerMonth(month: string, year?: number): number {
  if (
    month === MONTH_LIST[0] ||
    month === MONTH_LIST[2] ||
    month === MONTH_LIST[4] ||
    month === MONTH_LIST[6] ||
    month === MONTH_LIST[7] ||
    month === MONTH_LIST[9] ||
    month === MONTH_LIST[11]
  ) {
    return 31;
  }

  if (
    month === MONTH_LIST[3] ||
    month === MONTH_LIST[5] ||
    month === MONTH_LIST[8] ||
    month === MONTH_LIST[10]
  ) {
    return 30;
  }

  if (month === MONTH_LIST[1]) {
    if (year && isLeapYear(year)) {
      return 29;
    } else {
      return 28;
    }
  }
}

export default function EntryFormDate({
  form,
  error,
  handleChange,
}: EntryFormComponentProps) {
  const [dayList, setDayList] = useState([]);

  useEffect(() => {
    const month = form.month;
    const year = form.year ? parseInt(form.year) : undefined;

    if (MONTH_LIST.includes(month)) {
      const daysPerMonth = getDaysPerMonth(form.month, year);
      setDayList(new Array(daysPerMonth).fill(0).map((_, index) => index + 1));
    }
  }, [form.month, form.year]);

  return (
    <Stack direction="row" spacing={2}>
      <FormControl fullWidth required error={error.day}>
        <InputLabel id="entry-form-day-label">Day</InputLabel>
        <Select
          required
          id="entry-form-day"
          name="day"
          labelId="entry-form-day-label"
          label="Day"
          value={form.day}
          onChange={handleChange as SelectProps['onChange']}
        >
          {dayList.map((day) => (
            <MenuItem key={day} value={day}>
              {day}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth required error={error.month}>
        <InputLabel id="entry-form-month-label">Month</InputLabel>
        <Select
          required
          id="entry-form-month"
          name="month"
          labelId="entry-form-month-label"
          label="Month"
          value={form.month}
          onChange={handleChange as SelectProps['onChange']}
        >
          {MONTH_LIST.map((month) => (
            <MenuItem key={month} value={month}>
              {month}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth required error={error.year}>
        <InputLabel id="entry-form-year-label">Year</InputLabel>
        <Select
          required
          id="entry-form-year"
          name="year"
          labelId="entry-form-year-label"
          label="Year"
          value={form.year}
          onChange={handleChange as SelectProps['onChange']}
        >
          {YEAR_LIST.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}
