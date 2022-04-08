import { PropsWithChildren } from 'react';
import { defaultFirebaseContext, FirebaseContext } from '../FirebaseContext';

export interface FirebaseProviderProps {}

const FirebaseProvider = ({
  children,
}: PropsWithChildren<FirebaseProviderProps>) => (
  <FirebaseContext.Provider value={defaultFirebaseContext}>
    {children}
  </FirebaseContext.Provider>
);

export default FirebaseProvider;
