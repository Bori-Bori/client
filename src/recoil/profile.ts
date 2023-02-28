import { atom } from 'recoil';

type profileAtomType = {
  imagePath: string;
};
export const profileAtom = atom<profileAtomType>({
  key: 'profileAtom',
  default: { imagePath: '' },
});
export const isLoginAtom = atom({
  key: 'isLoginAtom',
  default: false,
});
