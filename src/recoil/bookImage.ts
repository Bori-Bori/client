import { atom } from 'recoil';

const bookImageAtom = atom<string>({
  key: 'bookImageAtom',
  default: '',
});

export default bookImageAtom;
