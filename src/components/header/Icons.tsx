import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { getUserInfo } from '../../apis/userInfo';

import Notification from './Notification';
import Search from './Search';

import useIsLogin from '../../hooks/useIsLogin';
import showLoginModal from '../../recoil/showLoginModal';
import { isLoginAtom } from '../../recoil/profile';
import { profileImageAtom } from '../../recoil/profile';

const Icons = () => {
  const navigate = useNavigate();
  const isLogin = useRecoilValue(isLoginAtom);
  const setShowLoginModal = useSetRecoilState(showLoginModal);
  const [profileImage, setProfileImage] = useRecoilState(profileImageAtom);

  //fetch profileImage
  const { data } = useQuery(['userInfo'], getUserInfo);
  const img = data?.data.content.profileImage;
  useEffect(() => {
    setProfileImage(img);
  }, [img]);

  const onClickLogin = () => {
    setShowLoginModal(true);
  };

  //로그인 확인
  useIsLogin();

  return (
    <IconWrap>
      <Search />
      {isLogin ? (
        <>
          <Notification />
          <ProfileImg
            onClick={() => {
              navigate('/mypage');
            }}
          >
            <img src={profileImage} alt="프로필이미지" />
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
