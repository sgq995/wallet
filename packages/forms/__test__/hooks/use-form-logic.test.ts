import { renderHook } from '@testing-library/react';
import { useFormLogic } from '../../hooks';

describe('useFormLogic', () => {
  describe('when filter is provided', () => {
    it('should filtering out from value', () => {
      const newValue = 'test123';
      const expectedValue = 'test';
      const filter = (value: string) => value.replace(/[0-9]+/g, '');

      const { result } = renderHook(() => useFormLogic({ filter }));
      const { value } = result.current(newValue);

      expect(value).toBe(expectedValue);
    });

    it('should filtering out from multiple types', () => {
      const newValue = 10;
      const expectedValue = 9;
      const filter = (value: number) => Math.min(Math.max(0, value), 9);

      const { result } = renderHook(() => useFormLogic({ filter }));
      const { value } = result.current(newValue);

      expect(value).toBe(expectedValue);
    });
  });

  describe('when validator is provided', () => {
    it('should report valid values', () => {
      const validValue = 'test';
      const validator = (value: string) => true;

      const { result } = renderHook(() => useFormLogic({ validator }));
      const { isValid } = result.current(validValue);

      expect(isValid).toBeTruthy();
    });

    it('should report invalid values', () => {
      const invalidValue = 'test';
      const validator = (value: string) => false;

      const { result } = renderHook(() => useFormLogic({ validator }));
      const { isValid } = result.current(invalidValue);

      expect(isValid).toBeFalsy();
    });

    it('should report validity for multiple types', () => {
      const invalidValue = 2;
      const validator = (value: number) => false;

      const { result } = renderHook(() => useFormLogic({ validator }));
      const { isValid } = result.current(invalidValue);

      expect(isValid).toBeFalsy();
    });

    it('should report a specific error', () => {
      const invalidValue = 'testing';
      const expectedError = new Error('invalid value detected');
      const validator = (value: string) => {
        throw expectedError;
      };

      const { result } = renderHook(() =>
        useFormLogic<string, Error>({ validator })
      );
      const { error, isValid } = result.current(invalidValue);

      expect(isValid).toBeFalsy();
      expect(error).toBe(expectedError);
    });
  });
});
