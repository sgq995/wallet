import React from 'react';
import { TStore } from '../form-store';
import { FormStoreProvider } from './form-store-provider';

export function WithFormStoreProvider<T, S extends TStore>(
  WrappedComponent: React.ComponentType<T>,
  defaultValues: S
) {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const ComponentWithProvider = (props: T) => {
    return (
      <FormStoreProvider defaultValues={defaultValues}>
        <WrappedComponent {...props} />
      </FormStoreProvider>
    );
  };

  ComponentWithProvider.displayName = `WithFormStoreProvider(${displayName})`;

  return ComponentWithProvider;
}
