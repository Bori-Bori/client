import React, { useState, useRef, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { throttle } from 'lodash';

import { notificationShowState } from '../../recoil/notification';
import NotificationList from './NotificationList';
import Logo from './Logo';
import Icons from './Icons';

const Header = () => {
  const [isNavOn, setIsNavOn] = useState(true);
  const showNotification = useRecoilValue(notificationShowState);

  //이전 스크롤 초기값
  const beforeScrollY = useRef(0);

  useEffect(() => {
    window.addEventListener('scroll', scrollEvent);
  }, []);

  const scrollEvent = useMemo(
    () =>
      throttle(() => {
        const currentScrollY = window.scrollY;
        if (beforeScrollY.current < currentScrollY) {
          setIsNavOn(false);
        } else if (currentScrollY === 0) {
          setIsNavOn(true);
        }
        //이전 스크롤값 저장
        beforeScrollY.current = currentScrollY;
      }, 300),
    [beforeScrollY],
  );

  return (
    <Container isNavOn={isNavOn}>
      <Logo />
      <IconContainer>
        <Icons />
        {showNotification && <NotificationList />}
      </IconContainer>
      <Outlet />
    </Container>
  );
};

export default Header;

const Container = styled.nav<{ isNavOn: boolean }>`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24.2px 17px;
  position: fixed;
  top: 0;
  z-index: 999;
  background-color: ${(props) => (props.isNavOn ? 'transparent' : '#fff')};
  @media screen and (max-width: 768px) {
    padding: 20px;
  }
`;
const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;
