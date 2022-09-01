export function createPadStartParser(maxLength: number, fillString?: string) {
  return function parsePadStart(value: string): string {
    return value.padStart(maxLength, fillString);
  };
}

export function createNullableParser<T>(
  parser: (value: string) => T,
  nullable: {
    value?: (value: string) => boolean;
    parsedValue?: (parsedValue: T) => boolean;
  }
) {
  return function parseOrNull(value: string): T | null {
    if (typeof nullable.value === 'function' && nullable.value(value)) {
      return null;
    }

    const parsedValue = parser(value);
    if (
      typeof nullable.parsedValue === 'function' &&
      nullable.parsedValue(parsedValue)
    ) {
      return null;
    }

    return parsedValue;
  };
}

export const parseIntOrNull = createNullableParser(parseInt, {
  parsedValue: (value) => Number.isNaN(value),
});
