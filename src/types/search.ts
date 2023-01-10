export interface IbookList {
  isbn: number;
  title: string;
  imagePath: string;
  author: string;
  commentCount: number;
}

export interface IfetchNextPage {
  isLast: boolean;
  nextPage: number;
  items: IbookList[];
}
