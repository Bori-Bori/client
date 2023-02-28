import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';

import useIsLogin from '../../../hooks/useIsLogin';
import showEditProfileModal from '../../../recoil/showEditProfileModal';
import SettingIcon from '../../../assets/icons/common_setting_gr_16.png';
import { getProfile } from '../../../apis/profile';
import { isLoginAtom, profileImageAtom } from '../../../recoil/profile';
import showLoginModal from '../../../recoil/showLoginModal';

type profileImageType = {
  profileImage: string;
  isLogin: boolean;
};

const Profile = () => {
  const setShowLoginModal = useSetRecoilState(showLoginModal);
  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom)
  const [showProfileModal, setShowEditProfileModal] = useRecoilState(showEditProfileModal);
  const [profileImage, setProfileImage] = useRecoilState(profileImageAtom);

  //로그인 검증
  useIsLogin();

  //get Profile
  const { data, refetch } = useQuery({
    queryKey: ['profile', isLogin],
    queryFn: () => getProfile(),
    onSuccess: (data) => {
      setProfileImage(data.profileImage);
    },
    enabled: !!isLogin,
  });

  const { nickname } = data || '';

  //edit profile modal
  const onShowEditProfile = () => {
    isLogin ? setShowEditProfileModal(true) : alert('로그인 후 이용해주세요');
  };

  useEffect(() => {
    refetch();
  }, [showProfileModal]);

  //login or logout 
  const onClickLogoutBtn = () => {
    if (isLogin) {
      window.localStorage.removeItem('user');
      setIsLogin(false);
      setProfileImage('');
      return;
    }
    setShowLoginModal(true);
  };

  return (
    <ProfileWrapper>
      <ProfileImg onClick={onShowEditProfile} profileImage={profileImage} isLogin={isLogin}>
        <SettingIconWrapper>
          <img src={SettingIcon} />
        </SettingIconWrapper>
      </ProfileImg>
      <div>
        <Username>{isLogin ? nickname : '로그인 후 이용해주세요'}</Username>
        <LogoutButton onClick={onClickLogoutBtn}>{isLogin ? '로그아웃' : '로그인'}</LogoutButton>
      </div>
    </ProfileWrapper>
  );
};

export default Profile;

const ProfileWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 120px;
  padding: 0 24px 30px;
  ${(props) => props.theme.media.tablet`
    border-bottom: 1px solid ${(props: any) => props.theme.colors.grey4}
  `}
`;

const ProfileImg = styled.div<profileImageType>`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 15px;
  cursor: pointer;
  ${(props) =>
    props.isLogin
      ? `
      background: url(${props.profileImage});
      `
      : `
      background-color: lightgrey;
      `}
  ${(props) => props.theme.media.tablet`
    width: 80px;
    height: 80px;
    background-size: 80px 80px;
  `}
`;

const SettingIconWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 10px;
  width: 24px;
  height: 24px;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 50%;
  text-align: center;
  line-height: 30px;
  box-shadow: 2px 2px 2px #d9d9d9;
`;

const Username = styled.span`
  display: block;
  font-size: ${(props) => props.theme.fontSize.header01};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  line-height: ${(props) => props.theme.lineHeight.lh26};
  margin-bottom: 4px;
  ${(props) => props.theme.media.tablet`
    font-size: ${(props: any) => props.theme.fontSize.header02};
    line-height: ${(props: any) => props.theme.lineHeight.lh24};
  `}
`;

const LogoutButton = styled.span`
  display: block;
  font-size: ${(props) => props.theme.fontSize.badge01};
  font-weight: ${(props) => props.theme.fontWeight.regular};
  line-height: ${(props) => props.theme.lineHeight.lh20};
  color: ${(props) => props.theme.colors.grey1};
  cursor: pointer;
`;
