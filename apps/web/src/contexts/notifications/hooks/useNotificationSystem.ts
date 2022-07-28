import { useContext } from 'react';

import { NotificationSystemContext } from '../NotificationSystemContext';

export default function useNotificationSystem() {
  return useContext(NotificationSystemContext);
}
