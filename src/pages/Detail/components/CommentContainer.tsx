import React, { useState, useRef, useEffect } from 'react';
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
  // const replyContainerBox = useRef<HTMLDivElement>(null);
  const curSortState = useRecoilValue(sortCommentAtom);
  const [replyIsOpen, setReplyIsOpen] = useState(false);
  const [replyCount, setReplyCount] = useState(replyNum);
  const replyOpenHandler = () => {
    setReplyIsOpen((prev) => !prev);
  };
  // const scrollDown = () => {
  //   if (replyContainerBox.current) {
  //     replyContainerBox.current.scrollTop = replyContainerBox.current.scrollHeight;
  //   }
  // };
  // useEffect(() => {
  //   scrollDown();
  // }, [replyIsOpen]);

  return (
    <CommentItemContainer>
      {curSortState && (
        <BubbleWrapper>
          <BubbleIcon className="commentPageBubble" text={page} />
        </BubbleWrapper>
      )}
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
  ${(props) => props.theme.media.tablet`
    padding-bottom: 30px;
  `}
`;

const CommentRow = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  ${(props) => props.theme.media.tablet`
    flex-direction: column;
    `}
`;

const ButtonBox = styled.div`
  width: 100px;
  ${(props) => props.theme.media.tablet`
    position: absolute;
    right: -25px;
    bottom: -15px;
  `}
`;
const BubbleWrapper = styled.div`
  min-width: 50px;
  margin-right: 15px;
  margin-top: 30px;
  ${(props) => props.theme.media.tablet`
    display: none;
  `}
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
