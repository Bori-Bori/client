import React from 'react';
import styled from 'styled-components';

import comment from '../../../../assets/icons/common_comment_gr_24.png';

import { useRecoilValue } from 'recoil';
import { bookData } from './../bookData';
import { countState } from '../../../../recoil/slide';
import { useQuery } from '@tanstack/react-query';
import { getBookItem } from '../../../../apis/category';

const BookText = () => {
  const count = useRecoilValue(countState);

  const category1 = bookData[count]?.category1;
  const category2 = bookData[count]?.category2;
  const category3 = bookData[count]?.category3;
  const keyword = bookData[count]?.TITLE;

  const { data: bookItem } = useQuery(['bookItem', category1, category2, category3, keyword], () =>
    getBookItem(category1, category2, category3, keyword),
  );
  return (
    <BookTextWrap>
      <Title>🔥이번주 HOT 도서</Title>
      <Line />
      <BookTitleWrap>
        <BookNumber>{count + 1}</BookNumber>
        <BookTitle>{bookData[count].TITLE}</BookTitle>
      </BookTitleWrap>
      <BookAuthor>{bookData[count].AUTHOR}</BookAuthor>
      <Subject>
        <span>#{bookData[count].SUBJECT}</span>
        <span>#{bookData[count].KDC}</span>
      </Subject>
      <BookContent>
        <img src={comment} alt="댓글아이콘" />
        <span>{bookItem?.content?.items[0]?.commentCount}</span>
      </BookContent>
    </BookTextWrap>
  );
};

export default BookText;

const BookTextWrap = styled.div`
  max-width: 275px;
  min-width: 215px;
  width: 40%;
  padding-bottom: 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BookTitleWrap = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 8px;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.colors.secondary1};
  font-size: ${(props) => props.theme.fontSize.header01};
  font-weight: ${(props) => props.theme.fontWeight.bold};
`;

const BookNumber = styled.p`
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: 3.75rem;
  color: ${(props) => props.theme.colors.primary};
`;

const Subject = styled.p`
  font-weight: ${(props) => props.theme.fontWeight.regular};
  font-size: ${(props) => props.theme.fontSize.badge01};
  display: flex;
  gap: 8px;
  span {
    color: ${(props) => props.theme.colors.secondary1};
  }
`;
const BookTitle = styled.p`
  width: 100%;
  margin-top: -25px;
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: 2.25rem;
  color: ${(props) => props.theme.colors.black};
  line-height: 38px;
`;
const BookAuthor = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 8px 0;
  font-weight: ${(props) => props.theme.fontWeight.regular};
  font-size: ${(props) => props.theme.fontSize.header02};
  color: ${(props) => props.theme.colors.grey1};
`;

const BookContent = styled.ul`
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: ${(props) => props.theme.fontWeight.regular};
  font-size: ${(props) => props.theme.fontSize.body01};
  color: ${(props) => props.theme.colors.grey1};
  margin-top: 12px;
`;

const Line = styled.div`
  width: 1px;
  height: px;
  background-color: ${(props) => props.theme.colors.secondary1};
  margin: 20px 0;
  margin-left: 10px;
`;
