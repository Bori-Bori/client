import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { countState } from './../../../../../recoil/slide';
import { bookData } from './../../bookData';

// 이미지
import comment from '../../../../../assets/icons/common_comment_gr_24.png';
import { useQuery } from '@tanstack/react-query';
import { getBookItem } from '../../../../../apis/category';

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
      <Title>🔥 이번주 HOT 도서</Title>
      <BookNumber>{count + 1}</BookNumber>
      <BookTitle>{bookData[count]?.TITLE}</BookTitle>
      <BookAuthor>{bookData[count]?.AUTHOR}</BookAuthor>
      <Subject>
        <span>#{bookData[count]?.SUBJECT}</span>
        <span>#{bookData[count]?.KDC}</span>
      </Subject>
      <BookContent>
        <BooKInfo>
          <img src={comment} alt="댓글아이콘" />
          <span>{bookItem?.content?.items[0]?.commentCount}</span>
        </BooKInfo>
      </BookContent>
    </BookTextWrap>
  );
};

export default BookText;

const BookTextWrap = styled.article`
  width: 40%;
`;
const Title = styled.h1`
  margin-bottom: 1.25rem;
  color: ${(props) => props.theme.colors.secondary1};
  font-size: ${(props) => props.theme.fontSize.header01};
  font-weight: ${(props) => props.theme.fontWeight.bold};
`;

const BookNumber = styled.p`
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: 3.75rem;
  color: ${(props) => props.theme.colors.primary};
`;

const BookTitle = styled.p`
  margin-top: -2rem;
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.black};
  line-height: 2.375rem;
`;

const Subject = styled.p`
  font-weight: ${(props) => props.theme.fontWeight.regular};
  font-size: ${(props) => props.theme.fontSize.badge01};
  display: flex;
  gap: 0.5rem;
  span {
    color: ${(props) => props.theme.colors.secondary1};
  }
`;

const BookAuthor = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 8px 0;
  font-weight: ${(props) => props.theme.fontWeight.regular};
  font-size: ${(props) => props.theme.fontSize.body01};
  color: ${(props) => props.theme.colors.grey1};
`;

const BookContent = styled.ul`
  display: flex;
  align-items: center;
  gap: 19px;
  margin-top: 12px;
`;

const BooKInfo = styled.li`
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: ${(props) => props.theme.fontWeight.regular};
  font-size: ${(props) => props.theme.fontSize.body01};
  color: ${(props) => props.theme.colors.grey1};
`;
