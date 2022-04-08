import { createContext } from 'react';

import { analytics, auth, database } from './firebase';

export interface IFirebaseContext {
  analytics: typeof analytics;
  auth: typeof auth;
  database: typeof database;
}

export const defaultFirebaseContext: IFirebaseContext = {
  analytics,
  auth,
  database,
};

export const FirebaseContext = createContext<IFirebaseContext>(
  defaultFirebaseContext
);
