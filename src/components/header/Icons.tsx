import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import user from '../../assets/icons/user-yl-20.png';

import showModal from '../../recoil/showModal';

import Notification from './Notification';
import Search from './Search';

const Icons = () => {
  const navigate = useNavigate();
  const setShowLoginModal = useSetRecoilState(showModal);

  const onClickLogin = () => {
    setShowLoginModal(true);
  };
  return (
    <IconWrap>
      <Search />
      {window.localStorage.getItem('user') ? (
        <>
          <Notification />
          <MyPage
            onClick={() => {
              navigate('/mypage');
            }}
          >
            <img src={user} alt="마이페이지" />
          </MyPage>
        </>
      ) : (
        <LoginBtn onClick={onClickLogin}>로그인</LoginBtn>
      )}
    </IconWrap>
  );
};

export default Icons;

const IconWrap = styled.div`
  position: relative;
  height: 60px;
  display: flex;
  align-items: center;
  gap: 24px;
`;
const MyPage = styled.button`
  cursor: pointer;
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
