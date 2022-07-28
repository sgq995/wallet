import { PropsWithChildren, useCallback, useState } from 'react';
import { NotificationSystemContext } from '../NotificationSystemContext';

import NotificationSystem, {
  INotificationSystemProps,
} from './NotificationSystem';

type NotificationList = INotificationSystemProps['notifications'];
type Notification = NotificationList[number];

function generateId(notifications: NotificationList) {
  return notifications.reduce((lastId, { id }) => {
    return id > lastId ? id : lastId;
  }, 0);
}

function useNotify(
  severity: Notification['severity'],
  notifications,
  setNotifications
) {
  return useCallback(
    (message: string) => {
      const id = generateId(notifications);
      const notification: Notification = {
        id,
        severity,
        message,
      };
      setNotifications([...notifications, notification]);
    },
    [notifications, setNotifications]
  );
}

export default function NotificationSystemProvider({
  children,
}: PropsWithChildren<{}>) {
  const [notifications, setNotifications] = useState<NotificationList>([]);

  const error = useNotify('error', notifications, setNotifications);
  const warning = useNotify('warning', notifications, setNotifications);
  const info = useNotify('info', notifications, setNotifications);
  const success = useNotify('success', notifications, setNotifications);

  return (
    <>
      <NotificationSystem
        notifications={notifications}
        onExited={(exitedId) => {
          setNotifications(notifications.filter(({ id }) => id !== exitedId));
        }}
      />
      <NotificationSystemContext.Provider
        value={{ error, warning, info, success }}
      >
        {children}
      </NotificationSystemContext.Provider>
    </>
  );
}
