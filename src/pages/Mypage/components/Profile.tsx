import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';

import useIsLogin from '../../../hooks/useIsLogin';
import showEditProfileModal from '../../../recoil/showEditProfileModal';
import SettingIcon from '../../../assets/icons/common_setting_gr_16.png';
import { profileImageAtom } from '../../../recoil/profile';
import showLoginModal from '../../../recoil/showLoginModal';
import { auth } from '../../../firebase/config';

type profileImageType = {
  profileImage: string;
  isLogin: boolean;
};

const Profile = () => {
  const navigate = useNavigate();
  const setShowLoginModal = useSetRecoilState(showLoginModal);
  const setShowEditProfileModal = useSetRecoilState(showEditProfileModal);
  const [profileImage, setProfileImage] = useRecoilState(profileImageAtom);
  const user = JSON.parse(localStorage.getItem('user')!);
  //로그인 검증
  useIsLogin();

  //edit profile modal
  const onShowEditProfile = () => {
    user ? setShowEditProfileModal(true) : alert('로그인 후 이용해주세요');
  };
  //login or logout
  const onClickLogoutBtn = () => {
    if (user) {
      auth.signOut();
      setProfileImage('');
      localStorage.clear();
      navigate('/');
      return;
    }
    setShowLoginModal(true);
  };

  return (
    <ProfileWrapper>
      <ProfileImg onClick={onShowEditProfile} profileImage={profileImage} isLogin={user}>
        <SettingIconWrapper>
          <img src={SettingIcon} />
        </SettingIconWrapper>
      </ProfileImg>
      <div>
        <Username>{user ? user?.displayName : '로그인 후 이용해주세요'}</Username>
        <LogoutButton onClick={onClickLogoutBtn}>{user ? '로그아웃' : '로그인'}</LogoutButton>
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
      background-size: cover;
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
