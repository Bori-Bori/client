import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { useMutation } from '@tanstack/react-query';

import showEditProfileModal from '../../../recoil/showEditProfileModal';
import { postProfile } from '../../../apis/profile';
import { profileAtom } from '../../../recoil/profile';

import Modal from '../../../components/Modal';
import { ModalPortal } from '../../../components/Modal';
import CommonButton from '../../../components/CommonButton';
import ProfileImg_1 from '../../../assets/profiles/profile_1.png';
import ProfileImg_2 from '../../../assets/profiles/profile_2.png';
import ProfileImg_3 from '../../../assets/profiles/profile_3.png';
import ProfileImg_4 from '../../../assets/profiles/profile_4.png';
import ProfileImg_5 from '../../../assets/profiles/profile_5.png';
import ProfileImg_6 from '../../../assets/profiles/profile_6.png';
import ProfileImg_7 from '../../../assets/profiles/profile_7.png';
import ProfileImg_8 from '../../../assets/profiles/profile_8.png';
import ProfileImg_9 from '../../../assets/profiles/profile_9.png';
import ProfileImg_10 from '../../../assets/profiles/profile_10.png';
import ProfileImg_11 from '../../../assets/profiles/profile_11.png';
import ProfileImg_12 from '../../../assets/profiles/profile_12.png';

const img_array = [
  { file: ProfileImg_1, color: 'brown' },
  { file: ProfileImg_2, color: 'brown' },
  { file: ProfileImg_3, color: 'brown' },
  { file: ProfileImg_4, color: 'brown' },
  { file: ProfileImg_5, color: 'blue' },
  { file: ProfileImg_6, color: 'blue' },
  { file: ProfileImg_7, color: 'blue' },
  { file: ProfileImg_8, color: 'blue' },
  { file: ProfileImg_9, color: 'orange' },
  { file: ProfileImg_10, color: 'orange' },
  { file: ProfileImg_11, color: 'orange' },
  { file: ProfileImg_12, color: 'orange' },
];

const EditProfileModal = () => {
  const [selectImgIndex, setSelectImgIndex] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const setProfile = useSetRecoilState(profileAtom);

  useEffect(() => {
    selectImgIndex && handleItemClick(selectImgIndex);
  }, [selectImgIndex]);

  const handleItemClick = (index: number) => {
    setSelectImgIndex(index);

    if (scrollContainerRef.current) {
      const itemElement = scrollContainerRef.current.childNodes[index] as HTMLElement;
      const containerWidth = scrollContainerRef.current.offsetWidth;
      const itemWidth = itemElement.offsetWidth;
      const scrollLeft = itemElement.offsetLeft - (containerWidth - itemWidth) / 2;

      scrollContainerRef.current.scrollLeft = scrollLeft;
    }
  };

  const setShowEditProfileModal = useSetRecoilState(showEditProfileModal);

  const onShowEditProfile = () => {
    setShowEditProfileModal(false);
  };

  //postProfile
  const getId = window.localStorage.getItem('user')!;
  const id = JSON.parse(getId).id;
  const profileData = {
    id,
    imagePath: `https://boribori-profile.s3.ap-northeast-2.amazonaws.com/profile_${selectImgIndex + 1}.png`,
  };

  const postProfileMutate = useMutation(() => postProfile(profileData), {
    onSuccess: (response) => setProfile(response.content),
    onError: (error) => console.log(error),
  });

  const onClickSubmit = () => {
    postProfileMutate.mutate();
    setShowEditProfileModal(false);
  };

  return (
    <ModalPortal>
      <ProfileModal className="editProfileModal" onClick={onShowEditProfile}>
        <EditProfileHeader>프로필 사진으로 사용할 이미지를 골라주세요.</EditProfileHeader>
        <ProfileImgWrapper ref={scrollContainerRef}>
          {img_array.map((img, index) => (
            <div key={index}>
              <StyledInput
                type="radio"
                name="profileImg"
                id={`profile${index + 1}`}
                className="sr-only"
                defaultChecked={selectImgIndex === index ? true : false}
              />
              <StyledLabel htmlFor={`profile${index + 1}`} onClick={() => handleItemClick(index)}>
                <img src={img.file} className={img.color} />
              </StyledLabel>
            </div>
          ))}
        </ProfileImgWrapper>
        <StyledButton className="editProfileButton" onClick={onClickSubmit}>
          확인
        </StyledButton>
      </ProfileModal>
    </ModalPortal>
  );
};

export default EditProfileModal;

const ProfileModal = styled(Modal)`
  text-align: center;
`;

const EditProfileHeader = styled.h2`
  font-size: 30px;
  font-weight: ${(props) => props.theme.fontWeight.bold};
  word-break: keep-all;
  line-height: 40px;
  ${(props) => props.theme.media.tablet`
    font-size: 26px;
    line-height: 34px;
  `}
`;
const ProfileImgWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px 16px;
  margin-top: 36px;
  ${(props) => props.theme.media.tablet`
    grid-template-columns: repeat(16, 1fr);
    overflow-y: scroll;
    gap: 0px;
    padding: 25px 130px;
    scroll-behavior: smooth;
  `}
`;
const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 68px;
  height: 68px;
  > img {
    width: 60px;
    height: 60px;
    opacity: 0.3;
  }
  ${(props) => props.theme.media.tablet`
  > img {
    opacity: 0.4;
  }
    `}
`;

const StyledInput = styled.input`
  &:checked + ${StyledLabel} {
    border: 2px solid ${(props) => props.theme.colors.notice2};
    border-radius: 50%;
    > img {
      opacity: 1;
      &.brown {
        filter: drop-shadow(0 10px 14px rgba(214, 174, 117, 0.6));
      }
      &.blue {
        filter: drop-shadow(0 10px 14px rgba(191, 217, 242, 0.6));
      }
      &.orange {
        filter: drop-shadow(0px 10px 14px rgba(250, 185, 117, 0.6));
      }
    }
  }
`;

const StyledButton = styled(CommonButton)`
  width: 100%;
  height: 60px;
  margin: 35px auto 0;
  border-radius: 8px;
  font-size: ${(props) => props.theme.fontSize.body01};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  background-color: ${(props) => props.theme.colors.primary};
  ${(props) => props.theme.media.tablet`
    width: 90%;
  `}
`;
