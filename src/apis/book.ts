import { aladinAxiosInstance } from './axiosInstance';

export const getBooklist = async (
  category1?: string,
  category2?: string,
  category3?: string,
  pageParam?: number,
  contentType?: string,
  keyword?: string,
) => {
  const response = await aladinAxiosInstance.get('/booksearchlist', {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    params: {
      category1,
      category2,
      category3,
      pageParam,
      contentType,
      keyword,
    },
  });
  return response.data;
};
export const getSearchBooklist = async (
  contentType: string,
  category1: string,
  category2: string,
  category3: string,
  keyword: string,
  page: number,
) => {
  const params = {
    category1,
    category2,
    category3,
    keyword,
    contentType,
    page,
  };
  const response = await aladinAxiosInstance.get(`/booksearchlist`, {
    params,
  });
  return response;
};

export const getBookInfo = async (pageParam: number, contentType: string, boardId: string) => {
  const response = await aladinAxiosInstance.get('/booksearchlist', {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    params: {
      pageParam,
      contentType,
      boardId,
    },
  });
  return response.data;
};
