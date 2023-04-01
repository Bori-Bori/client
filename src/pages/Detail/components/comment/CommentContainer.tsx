import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { sortCommentAtom } from '../../../../recoil/sortComment';
import BubbleBox from './BubbleBox';
import ReplyComments from '../reply/ReplyComments';
import CommentItem from './CommentItem';
import ToggleButton from '../reply/ToggleButton';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { appFireStore } from '../../../../firebase/config';

const CommentContainer = ({ item }: any) => {
  const curSortState = useRecoilValue(sortCommentAtom);
  const [replyIsOpen, setReplyIsOpen] = useState(false);
  const [replyCount, setReplyCount] = useState(item?.length);
  const [replyList, setReplyList] = useState([]);
  const replyOpenHandler = () => {
    setReplyIsOpen((prev) => !prev);
  };
  //getReply
  useEffect(() => {
    const collectionRef = collection(appFireStore, 'reply');
    const documentRef = doc(collectionRef, item?.commentId);

    // 리스너 등록
    const unsubscribe = onSnapshot(documentRef, (doc) => {
      const replyList = doc.data()?.commentList || [];
      setReplyList(replyList);
    });

    // 컴포넌트 언마운트시 리스너 제거
    return () => unsubscribe();
  }, [item?.commentId]);

  return (
    <CommentItemContainer>
      {curSortState && (
        <BubbleWrapper>
          <BubbleIcon key={item.commentId} className="commentPageBubble" text={item?.targetPage} />
        </BubbleWrapper>
      )}
      <CommentItemWrapper>
        <CommentRow>
          <CommentItem item={item} />
          <ButtonBox>
            <ToggleButton
              className="toggleButton"
              onClick={replyOpenHandler}
              isOpened={replyIsOpen}
              replyNumber={replyList.length}
            />
          </ButtonBox>
        </CommentRow>
        {replyIsOpen && <ReplyComments key={item.commentId} commentId={item?.commentId} />}
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
