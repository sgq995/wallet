import { Button } from '@mui/material';
import { useState } from 'react';
import { TransactionsCreateDialog } from './transactions-create-dialog';

export const TransactionsCreateButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <TransactionsCreateDialog open={isOpen} onClose={handleClose} />
      <Button variant="contained" color="secondary" onClick={handleClick}>
        New
      </Button>
    </>
  );
};
