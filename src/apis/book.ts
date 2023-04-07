import { aladinAxiosInstance } from './axiosInstance';

export const getBooklist = async (
  category1?: string,
  category2?: string,
  category3?: string,
  pageParam?: number,
  contentType?: string,
  keyword?: string,
) => {
  const params = () => {
    if (category1 && category1 && category1) {
      return {
        category1,
        category2,
        category3,
        pageParam,
        contentType,
        keyword,
      };
    } else {
      return {
        pageParam,
        contentType,
        keyword,
      };
    }
  };
  const response = await aladinAxiosInstance.get('/booksearchlist', {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    params: params(),
  });
  return response.data;
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
