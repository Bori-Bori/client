import { atom } from 'recoil';

export const sortCommentAtom = atom({
  key: 'sortCommentAtom',
  default: true,
});

export const slideRangeValueAtom = atom({
  key: 'slideRangeValue',
  default: '0',
});
