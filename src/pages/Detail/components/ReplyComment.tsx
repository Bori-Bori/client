import React from 'react';
import styled from 'styled-components';

import InputComment from './InputComment';

const ReplyComment = () => {
  return (
    <ReplyCommentWrapper>
      <StyledInputComment
        className="ReplyInput"
        placeholder="대댓글을 입력하세요"
        onClick={() => {
          console.log('re');
        }}
      />
    </ReplyCommentWrapper>
  );
};

export default ReplyComment;

const ReplyCommentWrapper = styled.article`
  margin-left: 124px;
`;

const StyledInputComment = styled(InputComment)``;
