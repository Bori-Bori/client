import React, { useState } from 'react';
import styled from 'styled-components';

import CommentItem from './CommentItem';
import BubbleBox from './BubbleBox';

const Comment = () => {
  return (
    <CommentContainer>
      <BubbleWrapper>
        <BubbleIcon className="commentPageBubble" text="12" />
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

const BubbleIcon = styled(BubbleBox)`
  &::before {
    content: '';
    position: absolute;
    border-top: 8px solid transparent;
    border-left: 12px solid ${(props) => props.theme.colors.secondary2};
    border-right: 0px solid transparent;
    border-bottom: 5px solid transparent;
    top: 8px;
    left: 95%;
  }
`;
