import { FormStoreProvider } from '@wallet/form-store';

export const TransactionsBlockForm: React.FC = () => {
  return (
    <FormStoreProvider
      defaultValues={{
        amount: '0',
      }}
    ></FormStoreProvider>
  );
};
