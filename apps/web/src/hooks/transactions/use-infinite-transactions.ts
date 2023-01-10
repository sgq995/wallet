import { useQuery } from 'react-query';
import { ITransaction } from '../../models/transaction.model';
import { TransactionsService } from '../../services';

export function useInfiniteTransactions(query?: ITransaction) {
  return useQuery(['transactions', query], () =>
    TransactionsService.find(query)
  );
}
