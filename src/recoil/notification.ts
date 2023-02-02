import { atom } from 'recoil';

interface notificationList {
  boardId: string;
  commentId: string;
  replyId: string;
  replyContent: string;
  commentContent: string;
  replyUserNickname: string;
  page: string;
  createdAt: string;
}
export const notificationState = atom<notificationList[]>({ key: 'notification', default: [] });
export const isNotificationState = atom({ key: 'isNotification', default: false });
export const notificationShowState = atom({ key: 'notificationShow', default: false });
