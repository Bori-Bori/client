import axios from 'axios';

const ttbkey = 'ttbandn36091701005';

export const getBoard = async (boardId: string) => {
  const response = await axios.get(
    `https://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=${ttbkey}&itemIdType=ISBN13&ItemId=${boardId}&Cover=Big&output=JS&Version=20131101&OptResult=previewImgList`,
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  );
  return response.data;
};
