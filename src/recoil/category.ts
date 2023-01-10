import { atom } from 'recoil';

export const mainCategoryState = atom({ key: 'mainCategory', default: '국내' });
export const middleCategoryState = atom({ key: 'middleCategory', default: '소설/시/희곡' });
export const subCategoryState = atom({ key: 'subCategory', default: '한국' });
