import React from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useInfiniteQuery } from '@tanstack/react-query';

import sortCommentAtom from '../../../recoil/sortComment';
import commentsListAtom, { commentIsLastAtom } from '../../../recoil/comment';
import commentInputHeight from '../../../recoil/commentInputHeight';
import boardState from '../../../recoil/board';
import CommentItem from './CommentItem';
import CommonButton from '../../../components/CommonButton';
import { getComments } from '../../../apis/comment';

type Comment = {
  comment: string;
  createdAt: string;
  id: string;
  page: string;
  replyNum: string;
  userProfileImagePath: string;
  writer: string;
};

type marginProps = {
  margin: number;
};

interface IfetchNextPage {
  isLast: boolean;
  nextPage: number;
  items: Comment[];
}

const Comment = () => {
  const [curSortState, setCurSortState] = useRecoilState(sortCommentAtom);
  const [commentsList, setCommentsList] = useRecoilState(commentsListAtom);
  const inputWrapperHeight = useRecoilValue(commentInputHeight);
  const bookState = useRecoilValue(boardState);
  const [commentIsLast, setCommentIsLast] = useRecoilState(commentIsLastAtom);

  const boardId = bookState.isbn;
  const size = 5; // 고정값
  const bookPage = 1; //고정값

  const { fetchNextPage, status } = useInfiniteQuery({
    queryKey: ['commentsListAtom', boardId, curSortState, size, bookPage],
    queryFn: ({ pageParam = 0 }) => getComments({ boardId, curSortState, size, bookPage, pageParam }),
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
    getNextPageParam: (lastPage: IfetchNextPage) => (!lastPage.isLast ? lastPage.nextPage + 1 : undefined),
  });

  const onClickShowMoreCommentBtn = () => {
    fetchNextPage();
  };

  return (
    <CommentContainer margin={inputWrapperHeight}>
      {status === 'loading' ? (
        <p>loading...</p>
      ) : (
        // 에러 페이지도 만들기
        commentsList.map((comment: Comment) => (
          <CommentItem
            key={Math.random()}
            text={comment.comment}
            writer={comment.writer}
            publishDate={comment.createdAt.slice(0, 10)}
            replyNum={comment.replyNum}
            pageNum={comment.page}
            userProfileImagePath={comment.userProfileImagePath}
          />
        ))
      )}
      {!commentIsLast.isLast && (
        <ShowMoreCommentBtn className="showMoreCommentBtn" onClick={onClickShowMoreCommentBtn}>
          댓글 더보기
        </ShowMoreCommentBtn>
      )}
    </CommentContainer>
  );
};

export default Comment;

const CommentContainer = styled.article<marginProps>`
  width: 100%;
  margin-bottom: ${(props) => props.margin}px;
`;

const ShowMoreCommentBtn = styled(CommonButton)`
  margin: 20px auto 0;
  padding: 12px 16px;
  border-radius: 24px;
  font-size: ${(props) => props.theme.fontSize.body02};
  line-height: ${(props) => props.theme.lineHeight.lh20};
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.secondary1};
  font-weight: ${(props) => props.theme.fontWeight.bold};
`;
