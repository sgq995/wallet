import { act, renderHook } from '@testing-library/react';
import { useControlledComponent } from '../../hooks';

describe('useControlledComponent', () => {
  describe('when no default value was provided', () => {
    it('should return undefined', () => {
      const { result } = renderHook(() => useControlledComponent());

      expect(result.current.value).toBeUndefined();
    });
  });

  describe('when default value was provided', () => {
    it('should return the default value', () => {
      const defaultValue = 'test';

      const { result } = renderHook(() =>
        useControlledComponent({ defaultValue })
      );

      expect(result.current.value).toBe(defaultValue);
    });

    it('should handle multiple types', () => {
      const defaultValue = 1;

      const { result } = renderHook(() =>
        useControlledComponent({ defaultValue })
      );

      expect(typeof result.current.value).toBe(typeof defaultValue);
    });
  });

  describe('when change event is called', () => {
    it('should change the value', () => {
      const defaultValue = 'test';
      const newValue = 'testing';

      const { result } = renderHook(() =>
        useControlledComponent({ defaultValue })
      );
      act(() => result.current.onChange(newValue));

      expect(result.current.value).toBe(newValue);
    });
  });
});
