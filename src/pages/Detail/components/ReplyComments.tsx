import React, { useEffect, useState, useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';

import { getReply, postReply } from '../../../apis/reply';
import InputComment from './InputComment';
import ReplyPagination from './ReplyPagination';
import CommentItem from './CommentItem';

type ReplyPropsType = {
  commentId: string;
  setReplyCount: React.Dispatch<React.SetStateAction<string>>;
};

type ReplyType = {
  reply: string;
  createdAt: string;
  userId: string;
  userNickname: string;
  userProfileImagePath: string;
};

const ReplyComments = ({ commentId, setReplyCount }: ReplyPropsType) => {
  // ReplyComments.displayName = 'ReplyComments';
  const scrollPoint = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const [replyContent, setReplyContent] = useState<string>('');
  const [replyCurPage, setReplyCurPage] = useState<number>(0);

  //getReply
  const size = 5; //고정값
  const { status, data, error, isFetching } = useQuery({
    queryKey: ['reply', commentId, size, replyCurPage],
    queryFn: () => getReply(commentId, size, replyCurPage),
    keepPreviousData: true,
    staleTime: 5000,
  });

  //postReply
  const replyList: ReplyType[] = data?.data.content.items;
  const totalPageNum = data?.data.content.totalPage;
  const commentData = {
    content: replyContent,
  };
  const postReplyMutate = useMutation(() => postReply(commentId, commentData), {
    onSuccess: (response) => {
      queryClient.invalidateQueries(['reply']);
      setReplyCount((prev) => (parseInt(prev) + 1).toString());
      setReplyContent('');
    },
  });

  const onClickSubmit = () => {
    postReplyMutate.mutate();
  };

  // scrollToReply
  const scrollDown = () => {
    if (scrollPoint.current) {
      scrollPoint.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  useEffect(() => {
    scrollDown();
  }, [replyList]);

  return (
    <div ref={scrollPoint}>
      <ReplyInput
        className="ReplyInput"
        placeholder="대댓글을 입력하세요"
        onClick={onClickSubmit}
        commentContent={replyContent}
        changeCommentContent={setReplyContent}
      />
      {isFetching
        ? 'Loading...'
        : replyList &&
          replyList.map((item: ReplyType) => (
            <CommentItem
              key={Math.random()}
              text={item.reply}
              publishDate={item.createdAt}
              writer={item.userNickname}
              userProfileImagePath={item.userProfileImagePath}
              isReply={true}
            />
          ))}
      {replyList?.length > 0 && (
        <ReplyPagination pageLength={totalPageNum} curPage={replyCurPage} setCurPage={setReplyCurPage} />
      )}
    </div>
  );
};

export default ReplyComments;

const ReplyInput = styled(InputComment)`
  margin-bottom: 20px;
`;
