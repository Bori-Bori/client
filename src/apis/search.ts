import { ALADINLIST } from '../pages/shared/aladinList';
import axios from 'axios';

const ttbkey = 'ttbandn36091701005';

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

  try {
    const response: ResponseData = await axios.get(
      `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${ttbkey}&Query=${keyword}&QueryType=${contentType}&CategoryId=${
        foundCategory?.CID || 0
      }&MaxResults=10&start=${(page - 1) * 10}&Cover=Big&output=JS&Version=20131101`,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
