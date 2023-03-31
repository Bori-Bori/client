import { atom } from 'recoil';
import { CATEGORIES } from '../pages/shared/categoryList';

export const mainCategoryState = atom({ key: 'mainCategory', default: CATEGORIES[0] });
export const middleCategoryState = atom({ key: 'middleCategory', default: CATEGORIES[0].middlecategories[0] });
export const subCategoryState = atom({
  key: 'subCategory',
  default: CATEGORIES[0].middlecategories[0].subcategories[0],
});
