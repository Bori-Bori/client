import { authAxiosInstance } from './axiosInstance';

type Code = {
  code: string;
};

export const KakaoLogin = (code: Code) => {
  return authAxiosInstance.post(`/api/login/kakao?code=${code.code}`);
};
