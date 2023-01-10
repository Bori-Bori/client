import { boardAxiosInstance } from './axiosInstance';

export const getSearchBooklist = async (
  contentType: string,
  pageParam: number,
  category1?: string,
  category2?: string,
  category3?: string,
  keyword?: string,
) => {
  const res = await boardAxiosInstance.get(
    `/api/boards?category1=${category1}&category2=${category2}&category3=${category3}&keyword=${keyword}&queryType=${contentType}&size=3&page=${pageParam}`,
  );
  const { items, isLast } = res.data.content;
  return { items, nextPage: pageParam + 1, isLast };
};
