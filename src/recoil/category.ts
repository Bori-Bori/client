import { atom } from 'recoil';

export const mainCategoryState = atom({ key: 'mainCategory', default: '국내' });
export const subCategoryState = atom({ key: 'subCategory', default: '🔍 추리,범죄' });
export const middleCategoryState = atom({ key: 'middleCategory', default: '전체' });
