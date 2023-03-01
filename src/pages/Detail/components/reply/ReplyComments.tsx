import React, { useEffect, useState, useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import useIsLogin from '../../../../hooks/useIsLogin';
import { getReply, postReply } from '../../../../apis/reply';
import InputComment from '../comment/InputComment';
import ReplyPagination from './ReplyPagination';
import CommentItem from '../comment/CommentItem';
import { isLoginAtom } from '../../../../recoil/profile';

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
  const scrollPoint = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const [replyContent, setReplyContent] = useState<string>('');
  const [replyCurPage, setReplyCurPage] = useState<number>(0);
  const isLogin = useRecoilValue(isLoginAtom);

  //로그인 확인
  useIsLogin();

  //getReply
  const size = 5; //고정값
  const { data, isFetching } = useQuery({
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
    isLogin ? postReplyMutate.mutate() : alert('로그인 후 이용해주세요.');
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
    <ReplyInputWrapper ref={scrollPoint}>
      <ReplyInput
        className="ReplyInput"
        placeholder={isLogin ? '대댓글을 입력하세요' : '로그인 후 이용해주세요'}
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
    </ReplyInputWrapper>
  );
};

export default ReplyComments;

const ReplyInputWrapper = styled.article`
  ${(props) => props.theme.media.tablet`
    margin-top: 40px;
  `}
`;

const ReplyInput = styled(InputComment)`
  margin-bottom: 20px;
`;
