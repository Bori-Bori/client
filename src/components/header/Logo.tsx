import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import logo from '../../assets/icons/logo-horizon-26.png';

const Logo = () => {
  const navigate = useNavigate();

  const onClickHome = () => {
    navigate('/');
  };

  return (
    <LogoWrap>
      <img onClick={onClickHome} src={logo} alt="로고이미지" />
      <Line />
      <HeaderTitle>책 읽고 오순도순 이야기하는 공간</HeaderTitle>
    </LogoWrap>
  );
};

export default Logo;

const LogoWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  > img {
    cursor: pointer;
  }
`;
const Line = styled.div`
  width: 80px;
  height: 1px;
  background-color: ${(props) => props.theme.colors.secondary1};
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const HeaderTitle = styled.div`
  font-weight: ${(props) => props.theme.fontWeight.regular};
  font-size: ${(props) => props.theme.fontSize.body02};
  color: ${(props) => props.theme.colors.secondary1};
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
