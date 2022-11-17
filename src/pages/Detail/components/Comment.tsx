import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';

import sortCommentAtom from '../../../recoil/sortComment';
import { getComments } from '../../../apis/comment';
import commentInputHeight from '../../../recoil/commentInputHeight';
import CommentItem from './CommentItem';

type GetCommentsProps = {
  results: CommentsProps[];
};

type CommentsProps = {
  items: [
    {
      comment: string;
      createdAt: string;
      writer: string;
      replyNum: string;
    },
    {
      comment: string;
      createdAt: string;
      writer: string;
      replyNum: string;
    },
  ];
  totalPage: string;
  offset: string;
  size: string;
};

type Comment = {
  comment: string;
  createdAt: string;
  writer: string;
  replyNum: string;
};

type marginProps = {
  margin: number;
};

const Comment = () => {
  const inputWrapperHeight = useRecoilValue(commentInputHeight);
  useEffect(() => {
    console.log(inputWrapperHeight);
  }, [inputWrapperHeight]);

  const [curSortState, setCurSortState] = useRecoilState(sortCommentAtom);
  const { data, error, isLoading } = useQuery(
    ['comments', curSortState],
    () => getComments(123, curSortState, 10, 10),
    {
      staleTime: 5000,
      keepPreviousData: true,
    },
  );
  return (
    <CommentContainer margin={inputWrapperHeight}>
      <div>
        {isLoading
          ? 'loading...'
          : data.content.map((comment: Comment) => (
              <CommentItem
                key={Math.random()}
                text={comment.comment}
                writer={comment.writer}
                publishDate={comment.createdAt.slice(0, 10)}
                replyNum={comment.replyNum}
              />
            ))}
      </div>
    </CommentContainer>
  );
};

export default Comment;

const CommentContainer = styled.article<marginProps>`
  width: 100%;
  margin-bottom: ${(props) => props.margin}px;
`;
