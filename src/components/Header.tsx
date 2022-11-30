import React from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';

import logo from '../assets/icons/logo-horizon-26.png';
import search from '../assets/icons/search-yl-20.png';

import { useNavigate } from 'react-router-dom';
import showModal from '../recoil/showModal';

const Header = () => {
  const navigate = useNavigate();
  const setShowLoginModal = useSetRecoilState(showModal);
  const onClickLogin = () => {
    setShowLoginModal(true);
  };
  const onClickHome = () => {
    navigate('/');
  };
  const onClickSearch = () => {
    navigate('/search');
  };
  return (
    <Container>
      <LogoWrap>
        <img onClick={onClickHome} src={logo} alt="로고이미지" />
        <Line />
        <HeaderTitle>책 읽고 오순도순 이야기하는 공간</HeaderTitle>
      </LogoWrap>
      <RightWrap>
        <SearchWrap>
          <img onClick={onClickSearch} src={search} alt="검색이미지" />
          <SearchTipWrap>
            <Triangle>
              <div />
            </Triangle>
            <SearchTip>빠르게 찾아보세요</SearchTip>
          </SearchTipWrap>
        </SearchWrap>
        <LoginBtn onClick={onClickLogin}>로그인</LoginBtn>
      </RightWrap>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  max-width: 1024px;
  min-width: 360px;
  margin: 0 auto;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
`;
const LogoWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  > img {
    cursor: pointer;
  }
`;
const RightWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
  position: relative;
`;
const Line = styled.div`
  width: 80px;
  height: 1px;
  background-color: ${(props) => props.theme.colors.secondary1};
`;
const HeaderTitle = styled.div`
  font-weight: ${(props) => props.theme.fontWeight.regular};
  font-size: ${(props) => props.theme.fontSize.body02};
  color: ${(props) => props.theme.colors.secondary1};
`;
const SearchWrap = styled.div`
  position: relative;
  height: 60px;
  display: flex;
  align-items: center;
  img {
    cursor: pointer;
  }
`;
const SearchTipWrap = styled.div`
  position: absolute;
  height: 48px;
  bottom: -36px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Triangle = styled.div`
  > div {
    width: 0;
    height: 0;
    border-bottom: 14px solid ${(props) => props.theme.colors.primary};
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
  }
  width: 14px;
  height: 14px;
`;
const SearchTip = styled.p`
  font-weight: ${(props) => props.theme.fontWeight.regular};
  font-size: ${(props) => props.theme.fontSize.badge01};
  color: ${(props) => props.theme.colors.black};
  background-color: ${(props) => props.theme.colors.primary};
  padding: 6px 14px;
  border-radius: 40px;
  width: 122px;
  height: 34px;
  display: flex;
  align-items: center;
  text-align: center;
`;
const LoginBtn = styled.button`
  font-weight: ${(props) => props.theme.fontWeight.regular};
  font-size: ${(props) => props.theme.fontSize.body02};
  color: ${(props) => props.theme.colors.white};
  padding: 8px 16px;
  background-color: ${(props) => props.theme.colors.secondary1};
  border-radius: 20px;
`;
