import React, { useEffect } from 'react';
import { ConfirmDialog } from '../common';
import { useDeleteTransaction } from '../../hooks/transactions';
import { TIndex } from '@wallet/utilities';
import { useSetAtom } from 'jotai';
import { deletedTransactionAtom } from './transactions.state';

export interface ITransactionsDeleteConfirmDialogProps {
  id: TIndex;
  open: boolean;
  onClose?: () => void;
}

export const TransactionsDeleteConfirmDialog: React.FC<
  ITransactionsDeleteConfirmDialogProps
> = ({ id, open, onClose }) => {
  const { isLoading, isSuccess, mutate } = useDeleteTransaction();
  const setDeletedTransaction = useSetAtom(deletedTransactionAtom);

  useEffect(() => {
    setDeletedTransaction((deletedTransaction) => ({
      ...deletedTransaction,
      disabled: isLoading || isSuccess,
    }));
  }, [setDeletedTransaction, isLoading, isSuccess]);

  return (
    <ConfirmDialog
      open={open}
      onClose={onClose}
      onCancel={onClose}
      onOk={() => {
        setDeletedTransaction({
          id,
          disabled: isLoading || isSuccess,
        });
        mutate(id);
      }}
    >
      Do you want to delete the transaction?
    </ConfirmDialog>
  );
};
