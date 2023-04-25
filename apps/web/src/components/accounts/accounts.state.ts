import { TIndex } from '@wallet/utilities/model.utility';
import { atom } from 'jotai';

export const deletedAccountAtom = atom<{ id: TIndex; disabled: boolean }>({
  id: -1,
  disabled: true,
});
