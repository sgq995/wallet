import { yyyyMMdd } from '../../src/legacy/utilities/date.utility';

describe('date-utils', () => {
  it('should return formatted date as string', () => {
    const date = new Date(2022, 0, 1);

    const result = yyyyMMdd(date);
    expect(result).toBe('2022/01/01');
  });

  it('should return formatted date string as string', () => {
    const date = '2022-01-01';

    const result = yyyyMMdd(date);
    expect(result).toBe('2022/01/01');
  });
});
