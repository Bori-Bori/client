import { atom } from 'recoil';

export type commentsListAtomType = {
  comment: string;
  createdAt: string;
  id: string;
  page: string;
  replyNum: string;
  userProfileImagePath: string;
  writer: string;
};

const commentsListAtom = atom<commentsListAtomType[]>({
  key: 'commentsListAtom',
  default: [],
});

export const commentIsLastAtom = atom({
  key: 'commentIsLastAtom',
  default: {
    isLast: false,
  },
});

export default commentsListAtom;
