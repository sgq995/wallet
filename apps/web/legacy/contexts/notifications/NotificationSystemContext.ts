import { createContext } from 'react';

export interface INotificationSystemContext {
  error: (message: string) => void;
  warning: (message: string) => void;
  info: (message: string) => void;
  success: (message: string) => void;
}

const defaultNotifyFunction = () => {};

export const defaultNotificationSystemContext: INotificationSystemContext = {
  error: defaultNotifyFunction,
  warning: defaultNotifyFunction,
  info: defaultNotifyFunction,
  success: defaultNotifyFunction,
};

export const NotificationSystemContext =
  createContext<INotificationSystemContext>(defaultNotificationSystemContext);
