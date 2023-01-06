import React, { useState } from 'react';
import styled from 'styled-components';

import InputComment from './InputComment';

const ReplyComment = () => {
  // test용
  const [test, setTest] = useState<string>('');
  return (
    <ReplyCommentWrapper>
      <InputComment
        className="ReplyInput"
        placeholder="대댓글을 입력하세요"
        onClick={() => {
          console.log('re');
        }}
        commentContent={'123'}
        changeCommentContent={setTest}
      />
    </ReplyCommentWrapper>
  );
};

export default ReplyComment;

const ReplyCommentWrapper = styled.article`
  margin-left: 124px;
`;

// const StyledInputComment = styled(InputComment)``;
