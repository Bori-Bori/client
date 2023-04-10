import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { KakaoLogin } from '../../../apis/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { appFireStore } from '../../../firebase/config';

const KakaoOauth = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

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
      localStorage.setItem('user', JSON.stringify({ uid: id, displayName, photoURL }));
      const collectionRef = collection(appFireStore, 'userInfo');
      // id 값이 문자열이 아니면 문자열로 변환해줍니다.
      const documentRef = doc(collectionRef, String(id));
      const newData = { displayName, photoURL };
      await setDoc(documentRef, newData);
      navigate('/');
    } catch (e) {
      console.error(e);
      alert('로그인에 실패하였습니다. 잠시후에 다시 시도해주세요.');
    }
  };

  useEffect(() => {
    getKakao();
  }, []);

  return <div />;
};

export default KakaoOauth;
