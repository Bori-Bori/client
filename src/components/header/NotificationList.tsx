import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';

import { notifications } from './../../apis/notification';
import { Link } from 'react-router-dom';
import ReplyDate from './ReplyDate';
import { useSetRecoilState } from 'recoil';
import { isNotificationState } from '../../recoil/notification';

const NotificationList = () => {
  const setIsNotification = useSetRecoilState(isNotificationState);
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
  // const { data } = useQuery(['notification'], notifications, {
  //   refetchOnWindowFocus: false,
  //   retry: 0,
  // });
  // const notificationData: notificationList[] = data?.data;
  // if (notificationData?.length > 0) {
  //   setIsNotification(true);
  // }
  return (
    <div></div>
    // <NotificationContainer>
    //   <NotificationNum>알림 ({notificationData?.length})</NotificationNum>
    //   {notificationData?.length !== 0 && (
    //     <NotificationListWrap>
    //       {notificationData?.map((value, index) => {
    //         return (
    //           <NotificationItemWrap key={index}>
    //             <Link to={`/detail/${value.boardId}`}>
    //               <CommentInfo>
    //                 <PageNum>{value.page}p.</PageNum>
    //                 <BookName>
    //                   <CommentText>“{value.commentContent}”에 달린 답글</CommentText>
    //                 </BookName>
    //               </CommentInfo>
    //               <ReplyText>{value.replyContent}</ReplyText>
    //               <ReplyInfo>
    //                 <ReplyWriter>{value.replyUserNickname}</ReplyWriter>
    //                 <ReplyDate date={value.createdAt} />
    //                 {index < 3 && <NewIcon>N</NewIcon>}
    //               </ReplyInfo>
    //             </Link>
    //           </NotificationItemWrap>
    //         );
    //       })}
    //     </NotificationListWrap>
    //   )}
    // </NotificationContainer>
  );
};

export default NotificationList;
const NotificationContainer = styled.div`
  position: absolute;
  right: 17px;
  top: calc(100% - 4px);
  width: 423px;
  max-height: 540px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  background-color: ${(props) => props.theme.colors.white};
  border: 1.5px solid ${(props) => props.theme.colors.primary};
  border-radius: 8px;
  padding: 18px 20px;
  @media screen and (max-width: 768px) {
    width: calc(100% - 40px);
  }
`;

const NotificationNum = styled.h2`
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: ${(props) => props.theme.fontSize.body01};
`;

const NotificationListWrap = styled.ul`
  display: flex;
  flex-direction: column;
`;
const NotificationItemWrap = styled.li`
  border-bottom: 1px solid ${(props) => props.theme.colors.grey4};
  padding: 16px 0;
  a {
    display: block;
  }
`;
const CommentInfo = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
`;
const PageNum = styled.span`
  background-color: ${(props) => props.theme.colors.secondary2};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: ${(props) => props.theme.fontSize.badge02};
  color: ${(props) => props.theme.colors.black};
  text-align: center;
  padding: 2px 6px;
  height: 24px;
  display: flex;
  align-items: center;
  border-radius: 6px;
`;

const BookName = styled.h3`
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: ${(props) => props.theme.fontSize.body02};
  color: ${(props) => props.theme.colors.grey1};
`;
const CommentText = styled.span`
  font-weight: ${(props) => props.theme.fontWeight.regular};
  font-size: ${(props) => props.theme.fontSize.body02};
  color: ${(props) => props.theme.colors.grey1};
`;

const ReplyInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ReplyText = styled.p`
  font-weight: ${(props) => props.theme.fontWeight.regular};
  font-size: ${(props) => props.theme.fontSize.body02};
  color: ${(props) => props.theme.colors.black};
  margin-bottom: 4px;
`;
const ReplyWriter = styled.p`
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: ${(props) => props.theme.fontSize.badge01};
  color: ${(props) => props.theme.colors.black};
  margin-right: 8px;
`;
const NewIcon = styled.span`
  display: block;
  width: 22px;
  height: 22px;
  text-align: center;
  line-height: 22px;
  background-color: ${(props) => props.theme.colors.notice1};
  border-radius: 100%;
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: ${(props) => props.theme.fontSize.badge01};
  color: ${(props) => props.theme.colors.white};
`;
