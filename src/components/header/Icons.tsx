import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import showModal from '../../recoil/showModal';

import Notification from './Notification';
import Search from './Search';
import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '../../apis/userInfo';

const Icons = () => {
  const navigate = useNavigate();
  const setShowLoginModal = useSetRecoilState(showModal);

  const onClickLogin = () => {
    setShowLoginModal(true);
  };

  const { data } = useQuery(['userInfo'], getUserInfo);
  const img = data?.data.content.profileImage;
  return (
    <IconWrap>
      <Search />
      {window.localStorage.getItem('user') ? (
        <>
          <Notification />
          <ProfileImg
            onClick={() => {
              navigate('/mypage');
            }}
          >
            <img src={img} alt="프로필이미지" />
          </ProfileImg>
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
const ProfileImg = styled.button`
  cursor: pointer;
  display: block;
  width: 28px;
  height: 28px;
  border-radius: 100%;
  overflow: hidden;
  img {
    width: 28px;
    height: 28px;
    object-fit: cover;
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
