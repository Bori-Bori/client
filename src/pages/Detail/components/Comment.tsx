import React from 'react';
import styled from 'styled-components';

import CommentItem from './CommentItem';

const Comment = () => {
  return (
    <CommentContainer>
      <CommentItem />
    </CommentContainer>
  );
};

export default Comment;

const CommentContainer = styled.article`
  width: 100%;
`;
