import { act, renderHook } from '@testing-library/react';
import { FormStore } from '../../form-store';
import { useUncontrolledFormComponent } from '../../hooks';

jest.mock('../../form-store');
const MockFormStore = FormStore as jest.MockedClass<typeof FormStore>;

describe('useUncontrolledFormComponent', () => {
  beforeEach(() => {
    MockFormStore.mockClear();
    (MockFormStore.prototype as any).register = jest.fn();
  });

  describe('when ref is called', () => {
    it('should register the component', () => {
      const register = jest.spyOn(MockFormStore.prototype, 'register');
      const rawValue = jest.fn();

      const { result } = renderHook(() =>
        useUncontrolledFormComponent('test', rawValue, { defaultValue: '' })
      );

      const ref = result.current;
      act(() => {
        ref({});
      });

      expect(register).toHaveBeenCalled();
    });
  });
});
