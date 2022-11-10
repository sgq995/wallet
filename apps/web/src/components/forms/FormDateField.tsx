import { useCallback, useEffect, useState } from 'react';

import type {
  FormControlProps,
  SelectChangeEvent,
  SelectProps,
} from '@mui/material';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import { numberValidator, useControlledFormComponent } from 'forms';
import { toInteger } from 'lodash';

const YEAR_LIST = new Array(new Date().getFullYear() - 2000 + 1)
  .fill(0)
  .map((_, index) => 2000 + index);

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

// const parseWithLeadingZero = createPadStartParser(2, '0');

export interface IFormDateFieldProps {
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

export function FormDateField({
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

  const {
    value: year,
    onChange: onYearChange,
    isValid: isValidYear,
  } = useControlledFormComponent({
    name: yearFieldName,
    validator: numberValidator,
  });
  const {
    value: month,
    onChange: onMonthChange,
    isValid: isValidMonth,
  } = useControlledFormComponent({
    name: monthFieldName,
    validator: numberValidator,
  });

  const dayValidator = useCallback(
    (value: number) => {
      if (!numberValidator(value)) {
        return false;
      }

      const daysPerMonth = getDaysPerMonth(MONTH_LIST[month], year);
      if (value < 1 && daysPerMonth < value) {
        return false;
      }

      return true;
    },
    [year, month]
  );

  const {
    value: day,
    onChange: onDayChange,
    isValid: isValidDay,
  } = useControlledFormComponent({
    name: dayFieldName,
    validator: dayValidator,
  });

  const [dayList, setDayList] = useState<string[]>(
    new Array(31).fill(0).map((_, index) => (index + 1).toString())
  );

  useEffect(() => {
    if (month < 0 && MONTH_LIST.length <= month) {
      return;
    }

    const daysPerMonth = getDaysPerMonth(MONTH_LIST[month], year);
    setDayList(() =>
      new Array(daysPerMonth).fill(0).map((_, index) => (index + 1).toString())
    );
  }, [month, year]);

  return (
    <>
      <FormControl
        required={required}
        fullWidth={fullWidth}
        error={!isValidYear}
      >
        <InputLabel id={yearLabelId}>Year</InputLabel>
        <Select
          id={yearId}
          name={yearFieldName}
          labelId={yearLabelId}
          label="Year"
          variant="outlined"
          value={year}
          onChange={({ target: { value } }: SelectChangeEvent<number>) => {
            onYearChange(toInteger(value));
          }}
        >
          {YEAR_LIST.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
        required={required}
        fullWidth={fullWidth}
        error={!isValidMonth}
      >
        <InputLabel id={monthLabelId}>Month</InputLabel>
        <Select
          id={monthId}
          name={monthFieldName}
          labelId={monthLabelId}
          label="Month"
          variant="outlined"
          value={month}
          onChange={({ target: { value } }: SelectChangeEvent<number>) => {
            onMonthChange(toInteger(value));
          }}
        >
          {MONTH_LIST.map((month, index) => (
            <MenuItem key={month} value={index}>
              {month}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
        required={required}
        fullWidth={fullWidth}
        error={!isValidDay}
      >
        <InputLabel id={dayLabelId}>Day</InputLabel>
        <Select
          id={dayId}
          name={dayFieldName}
          labelId={dayLabelId}
          label="Day"
          variant="outlined"
          value={day}
          onChange={({ target: { value } }: SelectChangeEvent<number>) => {
            onDayChange(toInteger(value));
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
