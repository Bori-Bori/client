import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { KakaoLogin } from '../../../apis/auth';

type Code = {
  code: string;
};

const KakaoOauth = () => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  const postCodeMutate = useMutation((code: Code) => KakaoLogin(code), {
    onSuccess: (response) => {
      console.log(response.data);
      const { id, accessToken, refreshToken, nickname } = response.data;

      window.localStorage.setItem('user', JSON.stringify({ id, accessToken, refreshToken, nickname }));
      navigate('/');
    },
    onError: (e: any) => {
      throw new Error(e);
    },
  });

  const getKakao = async () => {
    const codeParam = params.get('code');
    if (codeParam === null) {
      return;
    }
    postCodeMutate.mutate({ code: codeParam });
  };

  useEffect(() => {
    getKakao();
  }, []);

  return <div>Loading중</div>;
};

export default KakaoOauth;
