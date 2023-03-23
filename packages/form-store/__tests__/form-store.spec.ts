import { FormStore } from '../form-store';

describe('FormStore', () => {
  describe('when registering a component', () => {
    it('should update the default value', () => {
      const instance = new FormStore({ test: '' });

      instance.register({
        name: 'test',
        defaultValue: 'test',
      });

      expect(instance.snapshot()).toEqual({ test: 'test', hasError: false });
    });
  });

  describe('when updating a component', () => {
    it('should detect controlled elements', () => {
      const instance = new FormStore({ test: '' });

      instance.register({
        name: 'test',
      });
      instance.update({ name: 'test', rawValue: 'test' });

      expect(instance.snapshot()).toEqual({ test: 'test', hasError: false });
    });

    it('should detect uncontrolled elements', () => {
      const instance = new FormStore({ test: '' });

      instance.register({
        name: 'test',
        rawValue() {
          return 'test';
        },
      });

      expect(() =>
        instance.update({ name: 'test', rawValue: 'test' })
      ).toThrow();
      expect(instance.snapshot()).toEqual({ test: 'test', hasError: false });
    });
  });

  describe('when getting a snapshot', () => {
    it('should return the default values', () => {
      const instance = new FormStore({ test: '' });

      expect(instance.snapshot()).toEqual({ test: '', hasError: false });
    });

    it('should include components without a default value', () => {
      const instance = new FormStore({ test: '' });

      instance.register({ name: 'component' });
      instance.update({ name: 'component', rawValue: 'test' });

      expect(instance.snapshot()).toEqual({
        test: '',
        component: 'test',
        hasError: false,
      });
    });
  });
});
