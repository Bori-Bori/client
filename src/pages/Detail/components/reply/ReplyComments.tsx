import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import InputComment from '../comment/InputComment';
import { useAuthContext } from '../../../../context/useAuthContext';
import { useFirestore } from '../../../../hooks/useFireStore';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { appFireStore } from '../../../../firebase/config';
import ReplyItem from './ReplyItem';
import ReplyPagination from './ReplyPagination';

const ReplyComments = ({ commentId }: any) => {
  const scrollPoint = useRef<HTMLDivElement>(null);
  const [replyContent, setReplyContent] = useState<string>('');
  const [replyList, setReplyList] = useState([]);
  const { user }: any = useAuthContext();
  const PAGE_SIZE = 10; // the number of items per page
  const [replyCurPage, setReplyCurPage] = useState<number>(0);
  const [totalPageNum, setTotalPageNum] = useState<number>(1);

  useEffect(() => {
    const collectionRef = collection(appFireStore, 'reply');
    const documentRef = doc(collectionRef, commentId);

    const unsubscribe = onSnapshot(documentRef, (doc) => {
      const replyList = doc.data()?.commentList || [];
      setReplyList(replyList);
      setTotalPageNum(Math.ceil(replyList.length / PAGE_SIZE));
    });

    return () => unsubscribe();
  }, [commentId]);

  const uid = user?.uid;
  const { addOrUpdateDocument } = useFirestore('reply', commentId);

  const onClickSubmit = (): void => {
    if (user) {
      addOrUpdateDocument({ uid, replyContent, commentId });
      setReplyContent('');
    } else {
      alert('로그인이 필요합니다.');
    }
  };

  const scrollDown = () => {
    if (scrollPoint.current) {
      scrollPoint.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  useEffect(() => {
    scrollDown();
  }, [replyList]);

  // Slicing replyList based on current page and page size
  const startIndex = replyCurPage * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentReplyList = replyList.slice(startIndex, endIndex);

  return (
    <ReplyInputWrapper ref={scrollPoint}>
      <ReplyInput
        className="ReplyInput"
        placeholder={user ? '대댓글을 입력하세요' : '로그인 후 이용해주세요'}
        onClick={onClickSubmit}
        commentContent={replyContent}
        changeCommentContent={setReplyContent}
      />
      {currentReplyList.map((item: any) => (
        <ReplyItem key={Math.random()} item={item} />
      ))}
      {replyList?.length > 0 && (
        <ReplyPagination pageLength={totalPageNum} curPage={replyCurPage} setCurPage={setReplyCurPage} />
      )}
    </ReplyInputWrapper>
  );
};

export default ReplyComments;

const ReplyInputWrapper = styled.article`
  ${(props) => props.theme.media.tablet`
    margin-top: 40px;
  `}
`;

const ReplyInput = styled(InputComment)`
  margin-bottom: 20px;
`;
