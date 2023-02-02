import React from 'react';
import styled from 'styled-components';
import NotificationList from './NotificationList';

const NotificationBox = () => {
  return (
    <NotificationContainer>
      <NotificationNum>알림 (4)</NotificationNum>
      <NotificationList />
    </NotificationContainer>
  );
};

export default NotificationBox;
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
`;
const NotificationNum = styled.h2`
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: ${(props) => props.theme.fontSize.body01};
`;
