import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { sortCommentAtom } from '../../../recoil/sortComment';
import { slideRangeValueAtom } from '../../../recoil/sortComment';
import commentInputHeight from '../../../recoil/commentInputHeight';
import CommentContainer from './CommentContainer';
import CommonButton from '../../../components/CommonButton';
import { useParams } from 'react-router-dom';
import useCommentQuery from '../../../hooks/useCommentQuery';
import commentImg from '../../../assets/icons/comment-gr-60.png';

type Comment = {
  comment: string;
  createdAt: string;
  id: string;
  page: string;
  replyNum: string;
  userProfileImagePath: string;
  writer: string;
};

type marginProps = {
  margin: number;
};

const Comment = () => {
  const scrollPoint = useRef<HTMLDivElement>(null);
  const curSortState = useRecoilValue(sortCommentAtom);
  const inputWrapperHeight = useRecoilValue(commentInputHeight);
  const params = useParams();

  const boardId = params.id!;
  const size = 5; // 고정값
  const slideRangeValue = useRecoilValue(slideRangeValueAtom);
  const bookPage = parseInt(slideRangeValue);
  const searchOrder = curSortState ? 'recent' : 'page';

  const { fetchNextPage, status, commentsList, commentIsLast } = useCommentQuery(boardId, searchOrder, size, bookPage);

  // useEffect(() => {
  //   const setTimeountFunc = setTimeout(() => {
  //     console.log('bookPage 설정');
  //   }, 500);
  //   return () => {
  //     clearTimeout(setTimeountFunc);
  //     console.log('bookPage ');
  //   };
  // }, [bookPage]);
  
  const scrollToBottom = () => {
    scrollPoint.current?.scrollIntoView({behavior:'smooth' ,block:'end', inline: 'nearest'});
  };

  useEffect(()=>{
  scrollToBottom();
},[commentsList])

  const onClickShowMoreCommentBtn = () => {
    fetchNextPage();
  };

  if (status === 'loading') {
    return <p>loading...</p>;
  }
  return (
    <CommentWrapper margin={inputWrapperHeight} >
      {curSortState || (
        <CommentNumberAlert>
          해당 페이지 댓글 <Strong>{commentsList.length}</Strong>건
        </CommentNumberAlert>
      )}
      {commentsList.length ? (
        commentsList.map((item: Comment) => (
          <CommentContainer
            key={Math.random()}
            id={item.id}
            comment={item.comment}
            writer={item.writer}
            createdAt={item.createdAt}
            replyNum={item.replyNum}
            userProfileImagePath={item.userProfileImagePath}
            page={item.page}
          />
        ))
      ) : (
        <NoCommentAlertWrapper>
          <img src={commentImg} />
          <span>첫번째 댓글을 남겨주세요!</span>
        </NoCommentAlertWrapper>
      )}
      {!commentIsLast.isLast && (
        <ShowMoreCommentBtn className="showMoreCommentBtn" onClick={onClickShowMoreCommentBtn}>
          댓글 더보기
        </ShowMoreCommentBtn>
      )}
      <ScrollPointBox style={{height: '10px'}} ref={scrollPoint}></ScrollPointBox>
    </CommentWrapper>
  );
};

export default Comment;

const CommentWrapper = styled.article<marginProps>`
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
`