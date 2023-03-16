import { Button } from '@mui/material';
import { useState } from 'react';

export interface IToolbarCreateButtonProps {
  renderDialog: (isOpen: boolean, handleClose: () => void) => JSX.Element;
}

export const ToolbarCreateButton: React.FC<IToolbarCreateButtonProps> = ({
  renderDialog,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {renderDialog(isOpen, handleClose)}
      <Button variant="contained" color="secondary" onClick={handleClick}>
        New
      </Button>
    </>
  );
};
