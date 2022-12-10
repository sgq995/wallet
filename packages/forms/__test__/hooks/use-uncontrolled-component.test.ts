import { renderHook } from '@testing-library/react';
import { useUncontrolledComponent } from '../../hooks';

describe('useUncontrolledComponent', () => {
  it('should return undefined', () => {
    const { result } = renderHook(() => useUncontrolledComponent());

    expect(result.current.ref.current).toBeUndefined();
  });
});
