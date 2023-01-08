import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import styled from 'styled-components';

import { postReply } from '../../../apis/reply';
import InputComment from './InputComment';

type ReplyPropsType = {
  commentId: string;
};
const ReplyComment = ({ commentId }: ReplyPropsType) => {
  // test용
  const [replyContent, setReplyContent] = useState<string>('');

  //postReply
  // 댓글의 id가 필요하니까 넘겨받아야겠다.
  //useMutation으로 구현
  const data = {
    content: '',
  };

  const postReplyMutate = useMutation(() => postReply(commentId, data), {
    onSuccess: (response) => {
      // 대댓글 다시 불러오기, 상황에 따라 댓글 자체도 다시 불러오기
      setReplyContent('');
    },
  });

  const onClickSubmit = () => {
    postReplyMutate.mutate();
  };

  return (
    <ReplyCommentWrapper>
      <InputComment
        className="ReplyInput"
        placeholder="대댓글을 입력하세요"
        onClick={onClickSubmit}
        commentContent={replyContent}
        changeCommentContent={setReplyContent}
      />
    </ReplyCommentWrapper>
  );
};

export default ReplyComment;

const ReplyCommentWrapper = styled.article`
  margin-left: 124px;
`;

// const StyledInputComment = styled(InputComment)``;
