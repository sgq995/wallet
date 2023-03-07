import { Stack, TextField } from '@mui/material';
import { useControlledFormComponent } from '@wallet/form-store';
import React, { useEffect, useState } from 'react';

const YEAR_LIST = new Array(new Date().getFullYear() - 2000 + 1)
  .fill(0)
  .map((_, index) => 2000 + index);

interface IYearSelectProps {
  id?: string;
  required?: boolean;
  year: string;
  setYear: (year: string) => void;
}

const YearSelect: React.FC<IYearSelectProps> = ({
  id,
  required,
  year,
  setYear,
}) => {
  return (
    <TextField
      id={id}
      value={year}
      onChange={(event) => {
        setYear(event.target.value);
      }}
      label="Year"
      required={required}
      select
      SelectProps={{ native: true }}
      fullWidth
    >
      <option value=""></option>
      {YEAR_LIST.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </TextField>
  );
};

const MONTH_LIST = [
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

interface IFormDateMonthProps {
  id?: string;
  required?: boolean;
  month: string;
  setMonth: (month: string) => void;
}

const MonthSelect: React.FC<IFormDateMonthProps> = ({
  id,
  required,
  month,
  setMonth,
}) => {
  return (
    <TextField
      id={id}
      value={month}
      onChange={(event) => {
        setMonth(event.target.value);
      }}
      label="Month"
      required={required}
      select
      SelectProps={{ native: true }}
      fullWidth
    >
      <option value=""></option>
      {MONTH_LIST.map((month, index) => (
        <option key={month} value={index}>
          {month}
        </option>
      ))}
    </TextField>
  );
};

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

  throw new RangeError('WTF');
}

function createDaysList(daysPerMonth: number): string[] {
  return new Array(daysPerMonth)
    .fill(0)
    .map((_, index) => (index + 1).toString());
}

function useDayList(year: string, month: string) {
  const yearNumber = parseInt(year);
  const monthIndex = parseInt(month);

  const [dayList, setDayList] = useState<string[]>([]);

  useEffect(() => {
    if (!isFinite(yearNumber) || !isFinite(monthIndex)) {
      return;
    }

    if (monthIndex < 0 && MONTH_LIST.length <= monthIndex) {
      return;
    }

    const daysPerMonth = getDaysPerMonth(MONTH_LIST[monthIndex], yearNumber);
    const newDayList = createDaysList(daysPerMonth);
    setDayList(newDayList);
  }, [yearNumber, monthIndex]);

  return dayList;
}

interface IFormDayFieldProps {
  id?: string;
  required?: boolean;
  day: string;
  setDay: (day: string) => void;
  month: string;
  year: string;
}

const DaySelect: React.FC<IFormDayFieldProps> = ({
  id,
  required,
  day,
  setDay,
  month,
  year,
}) => {
  const dayList = useDayList(year, month);

  return (
    <TextField
      id={id}
      value={day}
      onChange={(event) => {
        setDay(event.target.value);
      }}
      label="Day"
      required={required}
      select
      SelectProps={{ native: true }}
      fullWidth
    >
      <option value=""></option>
      {dayList.map((day) => (
        <option key={day} value={day}>
          {day}
        </option>
      ))}
    </TextField>
  );
};

export interface IFormDateFieldProps {
  id?: string;
  name?: string;
  required?: boolean;
  defaultYear?: string;
  defaultMonth?: string;
  defaultDay?: string;
}

export const FormDateField: React.FC<IFormDateFieldProps> = ({
  id,
  name,
  required,
  defaultYear,
  defaultMonth,
  defaultDay,
}) => {
  const yearFieldId = id ? `${id}-year` : undefined;
  const yearFieldName = name ? `${name}-year` : 'year';
  const [year, setYear] = useControlledFormComponent(yearFieldName, {
    defaultValue: defaultYear,
    parser: parseInt,
    validator: isFinite,
  });

  const monthFieldId = id ? `${id}-year` : undefined;
  const monthFieldName = name ? `${name}-month` : 'month';
  const [month, setMonth] = useControlledFormComponent(monthFieldName, {
    defaultValue: defaultMonth,
    parser: parseInt,
    validator: isFinite,
  });

  const dayFieldId = id ? `${id}-year` : undefined;
  const dayFieldName = name ? `${name}-day` : 'day';
  const [day, setDay] = useControlledFormComponent(dayFieldName, {
    defaultValue: defaultDay,
    parser: parseInt,
    validator: isFinite,
  });

  return (
    <Stack direction="row" spacing={2}>
      <YearSelect
        id={yearFieldId}
        required={required}
        year={year}
        setYear={setYear}
      />

      <MonthSelect
        id={monthFieldId}
        required={required}
        month={month}
        setMonth={setMonth}
      />

      <DaySelect
        id={dayFieldId}
        required={required}
        day={day}
        setDay={setDay}
        month={month}
        year={year}
      />
    </Stack>
  );
};
