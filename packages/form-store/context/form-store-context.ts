import { createContext } from 'react';
import { FormStore } from '../form-store';

export const FormStoreContext = createContext<FormStore>(new FormStore({}));
