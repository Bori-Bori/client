import axiosInstance from './axiosInstance';

type Code = {
  code: string;
};

export const KakaoLogin = (code: Code) => {
  return axiosInstance.post(`/api/login/kakao?code=${code}`);
};
