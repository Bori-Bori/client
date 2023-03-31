import axios from 'axios';
const ttbkey = 'ttbandn36091701004';

export const getBoard = async (boardId: string) => {
  const response = await axios.get(
    `/ItemLookUp.aspx?ttbkey=${ttbkey}&itemIdType=ISBN13&ItemId=${boardId}&Cover=Big&output=JS&Version=20131101&OptResult=previewImgList`,
  );
  return response.data;
};
