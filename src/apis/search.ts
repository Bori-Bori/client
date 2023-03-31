import { ALADINLIST } from '../pages/shared/aladinList';
import { boardAxiosInstance } from './axiosInstance';

const ttbkey = 'ttbandn36091701004';

interface ResponseData {
  // 응답 데이터의 타입을 정의합니다.
  data: any;
}

export const getSearchBooklist = async (
  contentType: string,
  category1: string,
  category2: string,
  category3: string,
  keyword: string,
  page: number,
) => {
  const foundCategory = ALADINLIST.find(
    (category) =>
      category1 === category.category1 && category2 === category.category2 && category3 === category.category3,
  );

  const response: ResponseData = await boardAxiosInstance.get(
    `/ItemSearch.aspx?ttbkey=${ttbkey}&Query=${keyword}&QueryType=${contentType}&CategoryId=${
      foundCategory?.CID || 0
    }&MaxResults=10&start=${(page - 1) * 10}&Cover=Big&output=JS&Version=20131101`,
  );

  return response.data;
};
