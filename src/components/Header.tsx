import React, { useState, useRef, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { Outlet, useMatch, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { throttle } from 'lodash';

import logo from '../assets/icons/logo-horizon-26.png';
import search from '../assets/icons/search-yl-20.png';
import user from '../assets/icons/user-yl-20.png';
import close from '../assets/icons/common_close_bk_24.png';

import showModal from '../recoil/showModal';

const Header = () => {
  const match = useMatch('/search');
  const navigate = useNavigate();
  const setShowLoginModal = useSetRecoilState(showModal);

  const onClickLogin = () => {
    setShowLoginModal(true);
  };

  const onClickHome = () => {
    navigate('/');
  };

  const onClickClose = () => {
    navigate(-1);
  };
  const onClickSearch = () => {
    navigate('/search');
  };

  const [isNavOn, setIsNavOn] = useState(true);

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
      <LogoWrap>
        <img onClick={onClickHome} src={logo} alt="로고이미지" />
        <Line />
        <HeaderTitle>책 읽고 오순도순 이야기하는 공간</HeaderTitle>
      </LogoWrap>
      <RightWrap>
        <SearchWrap>
          {match ? (
            <Close onClick={onClickClose}>
              <img src={close} alt="닫기아이콘" />
            </Close>
          ) : (
            <>
              <Search onClick={onClickSearch}>
                <img src={search} alt="검색" />
              </Search>
              <SearchTipWrap>
                <Triangle>
                  <div />
                </Triangle>
                <SearchTip>빠르게 찾아보세요</SearchTip>
              </SearchTipWrap>
            </>
          )}
          <MyPage
            onClick={() => {
              navigate('/mypage');
            }}
          >
            <img src={user} alt="마이페이지" />
          </MyPage>
        </SearchWrap>
        <LoginBtn onClick={onClickLogin}>로그인</LoginBtn>
      </RightWrap>
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

const SearchWrap = styled.div`
  position: relative;
  height: 60px;
  display: flex;
  align-items: center;
`;
const Close = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 24px;
    @media screen and (max-width: 768px) {
      width: 18px;
    }
  }
`;
const Search = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 24px;
    @media screen and (max-width: 768px) {
      width: 18px;
    }
  }
`;
const MyPage = styled.button`
  cursor: pointer;
  display: none;
  img {
    width: 24px;
    @media screen and (max-width: 768px) {
      width: 18px;
      margin-left: 27.5px;
      display: flex;
      align-items: center;
    }
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
  @media screen and (max-width: 768px) {
    display: none;
  }
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
  @media screen and (max-width: 768px) {
    display: none;
  }
  font-weight: ${(props) => props.theme.fontWeight.regular};
  font-size: ${(props) => props.theme.fontSize.body02};
  color: ${(props) => props.theme.colors.white};
  padding: 8px 16px;
  background-color: ${(props) => props.theme.colors.secondary1};
  border-radius: 20px;
`;
