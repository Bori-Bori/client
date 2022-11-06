import React, { useState } from 'react';
import styled from 'styled-components';

import CommentItem from './CommentItem';
import BubbleBox from './BubbleBox';

const Comment = () => {
  return (
    <CommentContainer>
      <BubbleWrapper>
        <BubbleBox text="12" />
      </BubbleWrapper>
      <CommentItmeWrapper>
        <CommentItem />
      </CommentItmeWrapper>
    </CommentContainer>
  );
};

export default Comment;

const CommentContainer = styled.article`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const BubbleWrapper = styled.div`
  min-width: 50px;
`;

const CommentItmeWrapper = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.grey5};
  margin-left: 20px;
`;
