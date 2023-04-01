import axios from 'axios';

import { ALADINLIST } from './../pages/shared/aladinList';
const ttbkey = 'ttbandn36091701005';

export const getBookItem = async (
  category1: string,
  category2: string,
  category3: string,
  keyword: string | undefined,
) => {
  const foundCategory = ALADINLIST.find(
    (category) =>
      category1 === category.category1 && category2 === category.category2 && category3 === category.category3,
  );

  const response = await axios.get(
    `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${ttbkey}&Query=${keyword}&QueryType=Title&CategoryId=${
      foundCategory?.CID || 0
    }&MaxResults=10&start=1&SearchTarget=Book&output=JS&Version=20131101`,
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  );
  return response;
};

export const getBooklist = async (category1: string, category2: string, category3: string, page: number) => {
  const foundCategory = ALADINLIST.find(
    (category) =>
      category1 === category.category1 && category2 === category.category2 && category3 === category.category3,
  );

  const response = await axios.get(
    `https://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${ttbkey}&QueryType=Bestseller&SearchTarget=Book&SubSearchTarget=Book&CategoryId=${
      foundCategory?.CID || 0
    }&MaxResults=10&start=${(page - 1) * 10}&Cover=Big&output=JS&Version=20131101`,
  );
  return response.data;
};
