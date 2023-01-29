import React from 'react';
import styled from 'styled-components';
import NotificationItem from './NotificationItem';

const NotificationList = () => {
  return (
    <NotificationListWrap>
      {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((v, index) => {
        return <NotificationItem key={index} />;
      })}
    </NotificationListWrap>
  );
};

export default NotificationList;

const NotificationListWrap = styled.ul`
  display: flex;
  flex-direction: column;
`;
