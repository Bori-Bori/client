import { useInfiniteQuery } from '@tanstack/react-query';
import { getComments } from '../apis/comment';
import { useRecoilState } from 'recoil';
import commentsListAtom, { commentIsLastAtom } from '../recoil/comment';

type Comment = {
  comment: string;
  createdAt: string;
  id: string;
  page: string;
  replyNum: string;
  userProfileImagePath: string;
  writer: string;
};

interface IfetchNextPage {
  isLast: boolean;
  nextPage: number;
  items: Comment[];
}

const useCommentQuery = (boardId: string, searchOrder: string, size: number, bookPage: number | undefined) => {
  const [commentsList, setCommentsList] = useRecoilState(commentsListAtom);
  const [commentIsLast, setCommentIsLast] = useRecoilState(commentIsLastAtom);

  const { fetchNextPage, status } = useInfiniteQuery({
    queryKey: ['comments', boardId, searchOrder, size, bookPage],
    queryFn: ({ pageParam = 0 }) => getComments({ boardId, searchOrder, size, bookPage, pageParam }),
    onSuccess: (data) => {
      const newComments: Comment[] = [];
      data.pages.map((page) => newComments.push(...page.items));
      setCommentsList(newComments);

      const arrLastIndex = data.pages.length;
      const newIsLast = {
        isLast: data.pages[arrLastIndex - 1].isLast,
      };
      setCommentIsLast(newIsLast);
    },
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage: IfetchNextPage) => (!lastPage.isLast ? lastPage.nextPage + 1 : undefined),
  });

  return { fetchNextPage, status, commentsList, commentIsLast };
};

export default useCommentQuery;
