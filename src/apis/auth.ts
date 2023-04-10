import { kakaoAxiosInstance } from './axiosInstance';

export const KakaoLogin = async (code: string) => {
  const response = await kakaoAxiosInstance.post(`/oauth`, { code });
  return response.data;
};
