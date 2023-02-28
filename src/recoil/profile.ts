import { atom } from 'recoil';

export const profileImageAtom = atom({
  key: 'profileImageAtom',
  default: '',
});

export const isLoginAtom = atom({
  key: 'isLoginAtom',
  default: false,
});
