import { Box, Stack } from '@mui/material';

import Notification, { INotificationProps } from './Notification';

export interface INotificationSystemProps {
  notifications: Omit<INotificationProps, 'onExited'>[];
  onExited?: INotificationProps['onExited'];
}

export default function NotificationSystem({
  notifications,
  onExited,
}: INotificationSystemProps) {
  return (
    <Box
      sx={{
        zIndex: (theme) => theme.zIndex.tooltip,
        maxWidth: (theme) => `min(${theme.breakpoints.values.sm}px, 100vw)`,
        margin: '0 auto',
        padding: notifications.length > 0 ? 2 : 0,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Stack spacing={2} maxWidth="sm" flexGrow={1}>
        {notifications.map((props) => (
          <Notification key={props.id} {...props} onExited={onExited} />
        ))}
      </Stack>
    </Box>
  );
}
