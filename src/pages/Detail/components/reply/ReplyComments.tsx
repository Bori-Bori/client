import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import InputComment from '../comment/InputComment';
import { useAuthContext } from '../../../../context/useAuthContext';
import { useFirestore } from '../../../../hooks/useFireStore';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { appFireStore } from '../../../../firebase/config';
import ReplyItem from './ReplyItem';

const ReplyComments = ({ commentId }: any) => {
  const scrollPoint = useRef<HTMLDivElement>(null);
  const [replyContent, setReplyContent] = useState<string>('');
  const [replyList, setReplyList] = useState([]);

  const { user }: any = useAuthContext();

  //getReply
  useEffect(() => {
    const collectionRef = collection(appFireStore, 'reply');
    const documentRef = doc(collectionRef, commentId);

    // 리스너 등록
    const unsubscribe = onSnapshot(documentRef, (doc) => {
      const replyList = doc.data()?.commentList || [];
      setReplyList(replyList);
    });

    // 컴포넌트 언마운트시 리스너 제거
    return () => unsubscribe();
  }, [commentId]);

  //postReply
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

  // scrollToReply
  const scrollDown = () => {
    if (scrollPoint.current) {
      scrollPoint.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };
  console.log(replyList);
  useEffect(() => {
    scrollDown();
  }, [replyList]);

  return (
    <ReplyInputWrapper ref={scrollPoint}>
      <ReplyInput
        className="ReplyInput"
        placeholder={user ? '대댓글을 입력하세요' : '로그인 후 이용해주세요'}
        onClick={onClickSubmit}
        commentContent={replyContent}
        changeCommentContent={setReplyContent}
      />
      {replyList.map((item: any) => (
        <ReplyItem key={Math.random()} item={item} />
      ))}
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
