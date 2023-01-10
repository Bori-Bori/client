import { atom } from 'recoil';

export const categoryState = atom({
  key: 'category',
  default: {
    category1: '',
    category2: '',
    category3: '',
  },
});

export const contentTypeState = atom({
  key: 'contentType',
  default: 'keyword',
});

export const keywordState = atom({
  key: 'keyword',
  default: '',
});

export const showContentTypeState = atom({
  key: 'showContentType',
  default: false,
});

export const showListState = atom({
  key: 'showList',
  default: false,
});

export const showCategoryState = atom({
  key: 'showCategory',
  default: false,
});
