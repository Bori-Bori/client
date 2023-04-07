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

export const commentListAtom = atom({
  key: 'commentListAtom',
  default: [],
});

export const nextCommentListAtom = atom({
  key: 'nextCommentListAtom',
  default: [],
});
