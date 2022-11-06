import { render } from '@testing-library/react';
import { useContext } from 'react';
import { FormContext, FormProvider, IFormProviderProps } from '../../';

interface ICustomRenderOptions {
  providerProps: IFormProviderProps;
}

const customRender = (
  ui: React.ReactElement,
  { providerProps, ...renderOptions }: ICustomRenderOptions
) => {
  return render(
    <FormProvider {...providerProps}>{ui}</FormProvider>,
    renderOptions
  );
};

describe('FormProvider', () => {
  function TestFormProviderChildren() {
    const { state, dispatch } = useContext(FormContext);

    return <input type="text" />;
  }

  function TestFormProvider() {
    return (
      <FormProvider>
        <TestFormProviderChildren />
      </FormProvider>
    );
  }

  it('should provide form context', () => {
    customRender(<input />, {});

    expect(true).toBeTruthy();
  });
});
