import { useContext } from 'react';

import { FirebaseContext } from '../FirebaseContext';

export default function useFirebaseContext() {
  return useContext(FirebaseContext);
}
