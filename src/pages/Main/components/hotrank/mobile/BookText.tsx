import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import comment from '../../../../../assets/icons/common_comment_gr_24.png';

import { useRecoilValue } from 'recoil';
import { bookData } from '../../bookData';
import { countState } from '../../../../../recoil/slide';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { appFireStore } from '../../../../../firebase/config';

const BookText = () => {
  const count = useRecoilValue(countState);

  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    const collectionRef = collection(appFireStore, 'comments');
    const documentRef = doc(collectionRef, bookData[count]?.TITLE_URL);
    const unsubscribe = onSnapshot(documentRef, (doc) => {
      const commentList = doc.data()?.commentList || [];
      setCommentList(commentList);
    });

    return () => unsubscribe();
  }, [count]);

  return (
    <BookTextWrap>
      <div>
        <TitleWrap>
          <Title>🔥이번주 HOT 도서</Title>
          <div>
            <BookNumber>{count + 1}</BookNumber>
            <BookTitle>{bookData[count]?.TITLE}</BookTitle>
          </div>
        </TitleWrap>

        <BookAuthor>{bookData[count]?.AUTHOR}</BookAuthor>
        <Subject>
          <span>#{bookData[count]?.SUBJECT}</span>
          <span>#{bookData[count]?.KDC}</span>
        </Subject>
        <BookContent>
          <li>
            <img src={comment} alt="댓글아이콘" />
            <span>{commentList.length}</span>
          </li>
        </BookContent>
      </div>
    </BookTextWrap>
  );
};

export default BookText;

const BookTextWrap = styled.article`
  margin-bottom: 15px;
  width: 170px;
`;

const TitleWrap = styled.div`
  height: 155px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.fontSize.body02};
  font-weight: ${(props) => props.theme.fontWeight.bold};
`;

const BookNumber = styled.p`
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: 48px;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 10px;
`;

const BookTitle = styled.p`
  width: 100%;
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: ${(props) => props.theme.fontSize.header02};
  color: ${(props) => props.theme.colors.white};
  line-height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const BookAuthor = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 10px;
  line-height: 20px;
  font-weight: ${(props) => props.theme.fontWeight.regular};
  font-size: ${(props) => props.theme.fontSize.body02};
  color: ${(props) => props.theme.colors.white};
`;

const Subject = styled.p`
  font-weight: ${(props) => props.theme.fontWeight.regular};
  font-size: ${(props) => props.theme.fontSize.badge01};
  line-height: 20px;
  display: flex;
  gap: 0.5rem;
  span {
    color: ${(props) => props.theme.colors.white};
  }
`;

const BookContent = styled.ul`
  li {
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: ${(props) => props.theme.fontWeight.regular};
    font-size: ${(props) => props.theme.fontSize.badge01};
    color: ${(props) => props.theme.colors.white};
  }
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 4px;
`;
