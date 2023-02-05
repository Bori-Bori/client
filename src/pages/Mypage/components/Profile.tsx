import React from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';

import showEditProfileModal from '../../../recoil/showEditProfileModal'
import SettingIcon from '../../../assets/icons/common_setting_gr_16.png';

const Profile = () => {
  const setShowEditProfileModal = useSetRecoilState(showEditProfileModal);

  const onShowEditProfile = () => {
    setShowEditProfileModal(true);
  };
  return (
    // login 상태, logout 상태 다르게 보여야됨
    <ProfileWrapper>
      <ProfileImg onClick={onShowEditProfile}>
        <SettingIconWrapper>
          <img src={SettingIcon} />
        </SettingIconWrapper>
      </ProfileImg>
      <div>
        <Username>이름</Username>
        <LogoutButton>로그아웃</LogoutButton>
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

const ProfileImg = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: red;
  margin-right: 15px;
  cursor: pointer;
  ${(props) => props.theme.media.tablet`
    width: 80px;
    height: 80px;
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
`;
