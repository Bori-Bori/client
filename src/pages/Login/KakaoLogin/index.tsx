import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';

import { KakaoLogin } from '../../../apis/auth';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { appFireStore } from '../../../firebase/config';

import { profileImageAtom } from '../../../recoil/profile';

import CommentIcon from '../../../assets/icons/comment-gr-60.png';

const KakaoOauth = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const setProfileImage = useSetRecoilState(profileImageAtom);

  const postCodeMutate = useMutation((code: string) => KakaoLogin(code), {
    onSuccess: () => {
      navigate('/');
    },
    onError: (e: any) => {
      if (e.status === 500) {
        alert('로그인에 실패하였습니다. 잠시후에 다시 시도해주세요.');
      }
      throw new Error(e);
    },
  });
  const getKakao = async () => {
    const codeParam = params.get('code');
    if (!codeParam) {
      return;
    }
    try {
      const data = await postCodeMutate.mutateAsync(codeParam);
      const { properties, id } = data;
      const displayName = properties?.nickname;
      const photoURL = properties?.profile_image;
      localStorage.setItem('user', JSON.stringify({ uid: id, displayName }));
      const collectionRef = collection(appFireStore, 'userInfo');
      const documentRef = doc(collectionRef, String(id));
      const documentSnapshot = await getDoc(documentRef);

      if (documentSnapshot.exists()) {
        setProfileImage(documentSnapshot.data().photoURL);
        // 이미 존재하는 경우, 업데이트하지 않고 리턴합니다.
        return;
      } else {
        // 새로운 데이터를 저장합니다.
        const newData = { displayName, photoURL };
        await setDoc(documentRef, newData);
        setProfileImage(photoURL);
      }
      navigate('/');
    } catch (e) {
      console.error(e);
      alert('로그인에 실패하였습니다. 잠시후에 다시 시도해주세요.');
    }
  };
  useEffect(() => {
    getKakao();
  }, []);

  return (
    <StatusContainer>
      <img src={CommentIcon} />
      <span>로그인 중입니다.</span>
    </StatusContainer>
  );
};

export default KakaoOauth;
const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 145px;
  > span {
    font-size: ${(props) => props.theme.fontSize.body02};
    line-height: ${(props) => props.theme.lineHeight.lh20};
    color: ${(props) => props.theme.colors.grey1};
    margin-top: 20px;
  }
`;
