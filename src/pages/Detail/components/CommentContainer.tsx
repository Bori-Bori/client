import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { sortCommentAtom } from '../../../recoil/sortComment';
import BubbleBox from './BubbleBox';
import ReplyComments from './ReplyComments';
import CommentItem from './CommentItem';
import ToggleButton from './ToggleButton';

type Comment = {
  comment: string;
  createdAt: string;
  id: string;
  page: string;
  replyNum: string;
  userProfileImagePath: string;
  writer: string;
};

const CommentContainer = ({ id, comment, writer, createdAt, replyNum, userProfileImagePath, page }: Comment) => {
  const curSortState = useRecoilValue(sortCommentAtom);
  const [replyIsOpen, setReplyIsOpen] = useState(false);
  const [replyCount, setReplyCount] = useState(replyNum);
  const replyOpenHandler = () => {
    setReplyIsOpen((prev) => !prev);
  };
  return (
    <CommentItemContainer>
      {curSortState && <BubbleWrapper>{<BubbleIcon className="commentPageBubble" text={page} />}</BubbleWrapper>}
      <CommentItemWrapper>
        <CommentRow>
          <CommentItem
            key={Math.random()}
            id={id}
            text={comment}
            writer={writer}
            publishDate={createdAt}
            userProfileImagePath={userProfileImagePath}
            replyNum={replyCount}
            isReply={false}
          />
          <ButtonBox>
            <ToggleButton
              className="toggleButton"
              onClick={replyOpenHandler}
              isOpened={replyIsOpen}
              replyNumber={replyCount}
            />
          </ButtonBox>
        </CommentRow>
        {replyIsOpen && <ReplyComments commentId={id} setReplyCount={setReplyCount} />}
      </CommentItemWrapper>
    </CommentItemContainer>
  );
};

export default CommentContainer;

const CommentItemContainer = styled.article`
  display: flex;
  align-items: flex-start;
`;

const CommentItemWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.colors.grey5};
`;

const ButtonBox = styled.div`
  width: 100px;
`;

const CommentRow = styled.div`
  display: flex;
  align-items: center;
`;

const BubbleWrapper = styled.div`
  min-width: 50px;
  margin-right: 15px;
  margin-top: 30px;
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
