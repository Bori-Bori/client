import { atom } from 'recoil';

const bookPageAtom = atom<number>({
  key: 'bookPageAtom',
  default: 0,
});

export default bookPageAtom;
