import { TIndex } from '@wallet/utilities/model.utility';
import { atom } from 'jotai';

export const deletedTransactionAtom = atom<{ id: TIndex; disabled: boolean }>({
  id: -1,
  disabled: true,
});
