import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { onSnapshot, collection, doc } from 'firebase/firestore';
import { useRecoilValue } from 'recoil';

import { sortCommentAtom, slideRangeValueAtom } from '../../../../recoil/sortComment';
import commentInputHeight from '../../../../recoil/commentInputHeight';
import CommentContainer from './CommentContainer';
import CommonButton from '../../../../components/CommonButton';
import commentImg from '../../../../assets/icons/comment-gr-60.png';
import { appFireStore } from '../../../../firebase/config';
import 'firebase/compat/firestore';
type MarginProps = {
  margin: number;
};

const Comment = () => {
  const scrollPoint = useRef<HTMLDivElement>(null);
  const curSortState = useRecoilValue(sortCommentAtom);
  const inputWrapperHeight = useRecoilValue(commentInputHeight);
  const params = useParams<{ id: string }>(); // 변수 선언과 분리
  const boardId: any = params.id; // 변수 선언과 분리

  const [commentList, setCommentList] = useState([]);

  const slideRangeValue = useRecoilValue(slideRangeValueAtom);
  const [bookPage, setBookPage] = useState(parseInt(slideRangeValue));

  useEffect(() => {
    const collectionRef = collection(appFireStore, 'comments');
    const documentRef = doc(collectionRef, boardId);
    const unsubscribe = onSnapshot(documentRef, (doc) => {
      const commentList = doc.data()?.commentList || [];
      setCommentList(commentList);
    });

    return () => unsubscribe();
  }, []);

  // range value가 연속적이게 변할 때 fetch 요청 보내지 않도록 하는 코드
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setBookPage(parseInt(slideRangeValue));
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [slideRangeValue]);

  // scroll to bottom
  const scrollToBottom = () => {
    scrollPoint.current?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  };

  useEffect(() => {
    if (commentList) {
      // commentList가 있을 때만 스크롤 이동
      scrollToBottom();
    }
  }, [commentList]);

  if (status === 'loading') {
    return <p>loading...</p>;
  }
  return (
    <CommentWrapper margin={inputWrapperHeight}>
      {curSortState || (
        <CommentNumberAlert>
          해당 페이지 댓글 <Strong>{commentList?.length}</Strong>건
        </CommentNumberAlert>
      )}
      {commentList?.length ? (
        commentList?.map((targetPage: any) => <CommentContainer key={targetPage.commentId} item={targetPage} />)
      ) : (
        <NoCommentAlertWrapper>
          <img src={commentImg} alt="comment" />
          <span>첫번째 댓글을 남겨주세요!</span>
        </NoCommentAlertWrapper>
      )}
      {commentList && (
        <ShowMoreCommentBtn
          className="showMoreCommentBtn"
          onClick={() => {
            console.log('');
          }}
        >
          댓글 더보기
        </ShowMoreCommentBtn>
      )}
      <ScrollPointBox style={{ height: '10px' }} ref={scrollPoint} />
    </CommentWrapper>
  );
};

export default Comment;

const CommentWrapper = styled.article<MarginProps>`
  width: 100%;
  padding: 0 20px;
  margin-bottom: ${(props) => props.margin + 30}px;
`;

const ShowMoreCommentBtn = styled(CommonButton)`
  margin: 20px auto 0;
  padding: 12px 16px;
  border-radius: 24px;
  font-size: ${(props) => props.theme.fontSize.body02};
  line-height: ${(props) => props.theme.lineHeight.lh20};
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.secondary1};
  font-weight: ${(props) => props.theme.fontWeight.bold};
`;
const CommentNumberAlert = styled.span`
  display: inline-block;
  margin: 33px 0 10px;
  color: ${(props) => props.theme.colors.grey1};
`;

const Strong = styled.b`
  font-weight: ${(props) => props.theme.fontWeight.bold};
`;
const NoCommentAlertWrapper = styled.div`
  width: 100%;
  height: 196px;
  margin: 0 auto;
  text-align: center;
  > img {
    margin-top: 43px;
  }
  > span {
    display: block;
    margin-top: 20px;
    color: ${(props) => props.theme.colors.grey1};
  }
`;

const ScrollPointBox = styled.div`
  /* height: 5px; */
`;
