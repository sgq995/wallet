import { ITransactionReadonlyModel } from '../models/transaction.model';

export function groupByMonthAndYear<
  TTransaction extends ITransactionReadonlyModel
>(transactions: TTransaction[]) {
  let currentMonth = -1;
  let currentYear = -1;
  let currentBatch: TTransaction[] = [];

  return transactions.reduce<TTransaction[][]>((result, transaction) => {
    const month = transaction.date.getUTCMonth();
    const year = transaction.date.getUTCFullYear();

    if (month !== currentMonth || year !== currentYear) {
      currentMonth = month;
      currentYear = year;
      currentBatch = [];
      result.push(currentBatch);
    }

    currentBatch.push(transaction);

    return result;
  }, []);
}
