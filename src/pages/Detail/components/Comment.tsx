import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';

import sortCommentAtom from '../../../recoil/sortComment';
import { getComments } from '../../../apis/comment';

import CommentItem from './CommentItem';
import { idText } from 'typescript';

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

const Comment = () => {
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
    <CommentContainer>
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

const CommentContainer = styled.article`
  width: 100%;
`;
