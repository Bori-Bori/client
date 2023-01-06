import { atom } from 'recoil';

type boardStateType = {
  isbn: string;
  title: string;
  author: string;
  pubDate: string;
  category1: string;
  category2: string;
  category3: string;
  description: string;
  publisher: string;
  imagePath: string;
};
const boardState = atom<boardStateType>({
  key: 'boardState',
  default: {
    isbn: '',
    title: '',
    author: '',
    pubDate: '',
    category1: '',
    category2: '',
    category3: '',
    description: '',
    publisher: '',
    imagePath: '',
  },
});

export default boardState;
