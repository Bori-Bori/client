export type subcategory = { subCategoryId: number; name: string };
export type middlecategory = {
  id: number;
  name: string;
  subcategories: subcategory[];
};
export type category = {
  id: number;
  name: string;
  middlecategories: middlecategory[];
};
export type categoryType = category[];
