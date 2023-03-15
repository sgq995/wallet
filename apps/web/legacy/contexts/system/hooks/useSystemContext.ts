import { useContext } from 'react';
import { SystemContext } from '../SystemContext';

export default function useSystemContext() {
  return useContext(SystemContext);
}
