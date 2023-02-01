import React from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';

import showEditProfileModal from '../../../recoil/showEditProfileModal';

import Modal from '../../../components/Modal';
import ProfileImg_1 from '../../../assets/profiles/profile_1.png'

const EditProfileModal = () => {
  const setShowEditProfileModal = useSetRecoilState(showEditProfileModal);

  const onShowEditProfile = () => {
    setShowEditProfileModal(false)
  };
  return (
    <Modal className="editProfileModal" onClick={onShowEditProfile}>
      <span>프로필 사진으로 사용할 이미지를 골라주세요.</span>
      <div>
        <input type='radio' id='profile1' />
        <label htmlFor='profile1'><img src={ProfileImg_1}/></label>
      </div>
    </Modal>
  );
};

export default EditProfileModal;
