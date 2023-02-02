import React from 'react';
import styled from 'styled-components';

import bell from '../../assets/icons/common_bell_yl_24.png';
import triangle from '../../assets/icons/common_alarm_triangle.png';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isNotificationState, notificationShowState } from '../../recoil/notification';

const Notification = () => {
  const isNotification = useRecoilValue(isNotificationState);
  const [showNotification, setShowNotification] = useRecoilState(notificationShowState);

  const onClickNotification = () => {
    setShowNotification(!showNotification);
  };
  return (
    <NotificationWrap>
      <NotificationButton onClick={onClickNotification}>
        <img src={bell} alt="알림" />
        {isNotification && <NotificationCircle />}
        {showNotification && <TriangleIcon src={triangle} alt="삼각형아이콘" />}
      </NotificationButton>
    </NotificationWrap>
  );
};

export default Notification;

const NotificationButton = styled.button`
  position: relative;
`;
const NotificationCircle = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 4px;
  height: 4px;
  border-radius: 100%;
  background-color: ${(props) => props.theme.colors.warning};
`;
const TriangleIcon = styled.img`
  position: absolute;
  bottom: -18px;
  left: 50%;
  transform: translateX(-50%);
`;
const NotificationWrap = styled.div`
  position: relative;
`;
