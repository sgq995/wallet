import { useCallback, useEffect, useState } from 'react';

import type {
  FormControlProps,
  SelectChangeEvent,
  SelectProps,
} from '@mui/material';

import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import { useFormController } from './hooks';

const YEAR_LIST = new Array(new Date().getFullYear() - 2000 + 1)
  .fill(0)
  .map((_, index) => (2000 + index).toString());

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

function filter(value: string) {
  return value.replaceAll(/[^0-9]/g, '');
}

function numberValidator(value: string) {
  const asNumber = parseInt(value);

  if (isNaN(asNumber)) {
    return false;
  }

  return true;
}

interface IFormDateFieldProps {
  fullWidth?: FormControlProps['fullWidth'];
  required?: FormControlProps['required'];
  id?: SelectProps['id'];
  name?: SelectProps['name'];
  dayId?: SelectProps['id'];
  dayName?: SelectProps['name'];
  monthId?: SelectProps['id'];
  monthName?: SelectProps['name'];
  yearId?: SelectProps['id'];
  yearName?: SelectProps['name'];
}

export default function FormDateField({
  fullWidth,
  required,
  id,
  name,
  dayId,
  dayName,
  monthId,
  monthName,
  yearId,
  yearName,
}: IFormDateFieldProps) {
  const defaultName = name ? `${name}-` : '';
  const yearFieldName = yearName ?? `${defaultName}year`;
  const monthFieldName = monthName ?? `${defaultName}month`;
  const dayFieldName = dayName ?? `${defaultName}day`;

  const defaultId = id ? `${id}-` : '';
  const yearLabelId = `${yearId ?? `${defaultId}year`}-label`;
  const monthLabelId = `${monthId ?? `${defaultId}month`}-label`;
  const dayLabelId = `${dayId ?? `${defaultId}day`}-label`;

  const [year, yearError, onYearChange] = useFormController(yearFieldName, {
    validator: numberValidator,
  });
  const [month, monthError, onMonthChange] = useFormController(monthFieldName, {
    validator: numberValidator,
  });

  const dayValidator = useCallback(
    (value: string) => {
      const yearNumber = year ? parseInt(year) : undefined;
      if (typeof yearNumber === 'undefined') {
        return false;
      }

      const monthNumber = month ? parseInt(month) : undefined;
      if (typeof monthNumber === 'undefined') {
        return false;
      }

      if (!numberValidator(value)) {
        return false;
      }

      const valueNumber = parseInt(value);
      const daysPerMonth = getDaysPerMonth(
        MONTH_LIST[monthNumber - 1],
        yearNumber
      );
      if (valueNumber < 1 && daysPerMonth < valueNumber) {
        return false;
      }

      return true;
    },
    [year, month]
  );

  const [day, dayError, onDayChange] = useFormController(dayFieldName, {
    validator: dayValidator,
  });

  const [dayList, setDayList] = useState<string[]>(
    new Array(31).fill(0).map((_, index) => (index + 1).toString())
  );

  useEffect(() => {
    const yearNumber = year ? parseInt(year) : undefined;
    if (typeof yearNumber === 'undefined') {
      return;
    }

    const monthNumber = month ? parseInt(month) : undefined;
    if (typeof monthNumber === 'undefined') {
      return;
    }

    if (monthNumber < 1 && MONTH_LIST.length < monthNumber) {
      return;
    }

    const daysPerMonth = getDaysPerMonth(
      MONTH_LIST[monthNumber - 1],
      yearNumber
    );
    setDayList(
      new Array(daysPerMonth).fill(0).map((_, index) => (index + 1).toString())
    );
  }, [month, year]);

  return (
    <>
      <FormControl required={required} fullWidth={fullWidth} error={yearError}>
        <InputLabel id={yearLabelId}>Year</InputLabel>
        <Select
          id={yearId}
          name={yearFieldName}
          labelId={yearLabelId}
          label="Year"
          variant="outlined"
          value={year}
          onChange={({ target: { value } }: SelectChangeEvent<string>) => {
            onYearChange(value);
          }}
        >
          {YEAR_LIST.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl required={required} fullWidth={fullWidth} error={monthError}>
        <InputLabel id={monthLabelId}>Month</InputLabel>
        <Select
          id={monthId}
          name={monthFieldName}
          labelId={monthLabelId}
          label="Month"
          variant="outlined"
          value={month}
          onChange={({ target: { value } }: SelectChangeEvent<string>) => {
            onMonthChange(value);
          }}
        >
          {MONTH_LIST.map((month, index) => (
            <MenuItem key={month} value={(index + 1).toString()}>
              {month}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl required={required} fullWidth={fullWidth} error={dayError}>
        <InputLabel id={dayLabelId}>Day</InputLabel>
        <Select
          id={dayId}
          name={dayFieldName}
          labelId={dayLabelId}
          label="Day"
          variant="outlined"
          value={day}
          onChange={({ target: { value } }: SelectChangeEvent<string>) => {
            onDayChange(value);
          }}
        >
          {dayList.map((day) => (
            <MenuItem key={day} value={day}>
              {day}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
