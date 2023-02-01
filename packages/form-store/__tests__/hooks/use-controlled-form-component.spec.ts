import { act, renderHook } from '@testing-library/react';
import { useControlledFormComponent } from '../../hooks';

describe('useControlledFormComponent', () => {
  describe('when created with default value', () => {
    it('should return the default value', () => {
      const { result } = renderHook(() =>
        useControlledFormComponent('test', { defaultValue: '' })
      );

      const [value] = result.current;

      expect(value).toBe('');
    });
  });

  describe('when setting the value', () => {
    it('should update the default value', () => {
      const { result } = renderHook(() =>
        useControlledFormComponent('test', { defaultValue: '' })
      );

      const [, setValue] = result.current;
      act(() => {
        setValue('test');
      });

      const [value] = result.current;

      expect(value).toBe('test');
    });
  });
});
