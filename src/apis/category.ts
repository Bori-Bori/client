import { boardAxiosInstance } from './axiosInstance';
export const getBookItem = async (
  category1: string,
  category2: string,
  category3: string,
  size: number,
  page: number,
  keyword: string,
) => {
  const response = await boardAxiosInstance.get(
    `/api/boards?category1=${category1}&category2=${category2}&category3=${category3}&keyword=${keyword}&queryType=&size=${size}&page=${page}`,
  );
  return response.data;
};

export const getBooklist = async (category1: string, category2: string, category3: string, pageParam: number) => {
  const res = await boardAxiosInstance.get(
    `/api/boards?category1=${category1}&category2=${category2}&category3=${category3}&keyword=&queryType=&size=2&page=${pageParam}`,
  );
  const { items, isLast } = res.data.content;
  return { items, nextPage: pageParam + 1, isLast };
};
