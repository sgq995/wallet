import { useEffect, useState } from 'react';

import type { AlertProps } from '@mui/material';

import { Alert, Collapse } from '../../../components/Material';

export interface INotificationProps {
  id: number | string;
  severity: AlertProps['severity'];
  message: string;
  onExited?: (id: INotificationProps['id']) => void;
}

export default function Notification({
  id,
  severity,
  message,
  onExited,
}: INotificationProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => {
      setVisible(false);
    }, 3000);
    return () => {
      clearTimeout(id);
    };
  }, []);

  return (
    <Collapse
      in={visible}
      onExited={() => {
        onExited?.(id);
      }}
    >
      <Alert
        severity={severity}
        onClose={() => {
          setVisible(false);
        }}
      >
        {message}
      </Alert>
    </Collapse>
  );
}
