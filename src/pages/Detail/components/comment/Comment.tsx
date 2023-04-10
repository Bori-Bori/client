import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';

import { slideRangeValueAtom, sortCommentAtom } from '../../../../recoil/sortComment';
import commentInputHeight from '../../../../recoil/commentInputHeight';
import CommentContainer from './CommentContainer';
import CommonButton from '../../../../components/CommonButton';
import commentImg from '../../../../assets/icons/comment-gr-60.png';
import { useQuery } from '@tanstack/react-query';

import { getComments } from '../../../../apis/comment';
import { commentListAtom, nextCommentListAtom } from '../../../../recoil/comment';
type MarginProps = {
  margin: number;
};

const Comment = () => {
  const scrollPoint = useRef<HTMLDivElement>(null);
  const curSortState = useRecoilValue(sortCommentAtom);
  const inputWrapperHeight = useRecoilValue(commentInputHeight);
  const params = useParams<{ id: string }>(); // 변수 선언과 분리
  const boardId: any = params.id; // 변수 선언과 분리
  const slideRangeValue = useRecoilValue(slideRangeValueAtom);
  const [sortIsLatest, setSortIsLatest] = useRecoilState(sortCommentAtom);

  const { data: oniginCommentList } = useQuery([boardId], () => getComments(boardId));
  useEffect(() => {
    setCommentList(oniginCommentList?.initialComments);
    setNextCommentList(oniginCommentList?.nextComments);
  }, [oniginCommentList]);

  const [commentList, setCommentList] = useRecoilState(commentListAtom);
  const [nextCommentList, setNextCommentList] = useRecoilState(nextCommentListAtom);

  const onClickShowMoreCommentBtn = () => {
    setCommentList((prevList) => [...prevList, ...nextCommentList.slice(0, 10)]);
    setNextCommentList((prevList) => prevList.slice(10));
  };

  // scroll to bottom
  const scrollToBottom = () => {
    scrollPoint.current?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  };

  useEffect(() => {
    if (!sortIsLatest && oniginCommentList && oniginCommentList.initialComments && oniginCommentList?.nextComments) {
      const sortedCommentList: any = [...oniginCommentList.initialComments, ...oniginCommentList.nextComments].filter(
        (comment: any) => Number(comment.targetPage) === Number(slideRangeValue),
      );
      setCommentList(sortedCommentList.slice(0, 10));
      setNextCommentList(sortedCommentList.slice(10));
    }
  }, [sortIsLatest, slideRangeValue]);

  useEffect(() => {
    if (sortIsLatest && oniginCommentList && oniginCommentList.initialComments && oniginCommentList.nextComments) {
      const sortedCommentList: any = [...oniginCommentList.initialComments, ...oniginCommentList.nextComments].sort(
        (a: any, b: any) => (new Date(a.date).getTime() < new Date(b.date).getTime() ? 1 : -1),
      );
      setCommentList(sortedCommentList.slice(0, 10));
      setNextCommentList(sortedCommentList.slice(10));
    }
  }, [sortIsLatest]);

  useEffect(() => {
    if (commentList) {
      // commentList가 있을 때만 스크롤 이동
      scrollToBottom();
    }
  }, [commentList]);

  return (
    <CommentWrapper margin={inputWrapperHeight}>
      {curSortState || (
        <CommentNumberAlert>
          해당 페이지 댓글 <Strong>{commentList?.length}</Strong>건
        </CommentNumberAlert>
      )}
      {commentList ? (
        commentList.map((comment: any) => <CommentContainer key={comment.commentId} comment={comment} />)
      ) : (
        <NoCommentAlertWrapper>
          <img src={commentImg} alt="comment" />
          <span>첫번째 댓글을 남겨주세요!</span>
        </NoCommentAlertWrapper>
      )}
      {nextCommentList?.length !== 0 && (
        <ShowMoreCommentBtn className="showMoreCommentBtn" onClick={onClickShowMoreCommentBtn}>
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
