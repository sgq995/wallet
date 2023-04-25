import React, { useEffect } from 'react';
import { ConfirmDialog } from '../common';
import { useDeleteAccount } from '../../hooks/accounts';
import { TIndex } from '@wallet/utilities';
import { useSetAtom } from 'jotai';
import { deletedAccountAtom } from './accounts.state';

export interface IAccountsDeleteConfirmDialogProps {
  id: TIndex;
  open: boolean;
  onClose?: () => void;
}

export const AccountsDeleteConfirmDialog: React.FC<
  IAccountsDeleteConfirmDialogProps
> = ({ id, open, onClose }) => {
  const { isLoading, isSuccess, mutate } = useDeleteAccount();
  const setDeletedAccount = useSetAtom(deletedAccountAtom);

  useEffect(() => {
    setDeletedAccount((deletedAccount) => ({
      ...deletedAccount,
      disabled: isLoading || isSuccess,
    }));
  }, [setDeletedAccount, isLoading, isSuccess]);

  return (
    <ConfirmDialog
      open={open}
      onClose={onClose}
      onCancel={onClose}
      onOk={() => {
        setDeletedAccount({
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
