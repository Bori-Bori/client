import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { notifications } from './../../apis/notification';

const NotificationItem = () => {
  return (
    <NotificationItemWrap>
      <Link to="/detail/9791158392239">
        <CommentInfo>
          <PageNum>240p.</PageNum>
          <BookName>
            [나는 오래된 거리처...] <CommentText>“목숨을 인생을 하여...”에 달린 답글</CommentText>
          </BookName>
        </CommentInfo>
        <ReplyText>목숨을 인생을 하여도 쓸쓸한 천자만홍이 새가 가는 보이는 철환하였...</ReplyText>
        <ReplyInfo>
          <ReplyWriter>노래하는 라이언</ReplyWriter>
          <ReplyDate>22.10.22 16:23</ReplyDate>
          <NewIcon>N</NewIcon>
        </ReplyInfo>
      </Link>
    </NotificationItemWrap>
  );
};

export default NotificationItem;

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
const ReplyDate = styled.span`
  font-weight: ${(props) => props.theme.fontWeight.regular};
  font-size: ${(props) => props.theme.fontSize.badge01};
  color: ${(props) => props.theme.colors.grey1};
  margin-right: 4px;
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
