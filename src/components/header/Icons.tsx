import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';

import Notification from './Notification';
import Search from './Search';

import showLoginModal from '../../recoil/showLoginModal';
import { profileImageAtom } from '../../recoil/profile';
import { useAuthContext } from '../../context/useAuthContext';

const Icons = () => {
  const navigate = useNavigate();
  const setShowLoginModal = useSetRecoilState(showLoginModal);
  const [profileImage, setProfileImage] = useRecoilState(profileImageAtom);
  const { user }: any = useAuthContext();

  //fetch profileImage
  useEffect(() => {
    if (user) {
      const profile = user.photoURL;
      setProfileImage(profile);
    }
  }, [user]);

  const onClickLogin = () => {
    setShowLoginModal(true);
  };

  return (
    <IconWrap>
      <Search />
      {user ? (
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
  font-weight: ${(props) => props.theme.fontWeight.regular};
  font-size: ${(props) => props.theme.fontSize.body02};
  color: ${(props) => props.theme.colors.white};
  padding: 8px 16px;
  background-color: ${(props) => props.theme.colors.secondary1};
  border-radius: 20px;
`;
