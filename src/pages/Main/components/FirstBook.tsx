import React, { useState } from 'react';
import styled from 'styled-components';

import bookmark_default from '../../../assets/icons/bookmark-default-24.png';
import bookmark_select from '../../../assets/icons/bookmark-select-24.png';
import comment from '../../../assets/icons/common_comment_gr_24.png';
import user from '../../../assets/icons/common_user_gr_24.png';
import { bookData } from './bookData';
import { countState } from './../../../recoil/slide';
import { useRecoilValue } from 'recoil';
const FirstBook = () => {
  const [bookMark, setBookMark] = useState(false);
  const count = useRecoilValue(countState);
  return (
    <FirstBookWrap>
      <FirstBookImgWrap>
        <BookImg src={bookData[count].TITLE_URL} alt="도서이미지" />
      </FirstBookImgWrap>

      <BookTextWrap>
        <div>
          <Title>🔥 이번주 HOT 도서</Title>
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
            <li>
              <img src={comment} alt="댓글아이콘" />
              <span> 12</span>
            </li>
            <li>
              <img src={user} alt="유저아이콘" />
              <span> 3</span>
            </li>
            <li>
              <BookmarkBtn
                onClick={() => {
                  setBookMark(!bookMark);
                }}
              >
                <img src={bookMark ? bookmark_select : bookmark_default} alt="찜" />
              </BookmarkBtn>
            </li>
          </BookContent>
        </div>
      </BookTextWrap>
    </FirstBookWrap>
  );
};

export default FirstBook;
const FirstBookWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 60px;
  position: relative;
`;
const BookTextWrap = styled.div`
  > * {
    width: 240px;
  }
  height: 420px;
  padding-left: 364px;
  padding-top: 92px;
`;
const BookTitleWrap = styled.div`
  position: relative;
  margin-bottom: 8px;
`;
const BookNumber = styled.p`
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: 60px;
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
  margin-top: -35px;
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: 28px;
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
  li {
    display: flex;
    align-items: center;
    gap: 4px;
    font-weight: ${(props) => props.theme.fontWeight.regular};
    font-size: ${(props) => props.theme.fontSize.body01};
    color: ${(props) => props.theme.colors.grey1};
  }
  display: flex;
  align-items: center;
  gap: 19px;
  margin-top: 12px;
`;
const BookImg = styled.img`
  width: 100%;
`;
const Title = styled.h1`
  color: ${(props) => props.theme.colors.secondary1};
  font-size: ${(props) => props.theme.fontSize.header01};
  font-weight: ${(props) => props.theme.fontWeight.bold};
`;

const Line = styled.div`
  width: 1px;
  height: 40px;
  background-color: ${(props) => props.theme.colors.secondary1};
  margin: 20px 0;
  margin-left: 10px;
`;

const FirstBookImgWrap = styled.div`
  width: 264px;
  height: 420px;
  position: absolute;
  top: 65px;
  left: 60px;
  overflow: hidden;
  filter: drop-shadow(-30px 30px 30px rgba(74, 45, 0, 0.24));
`;
const BookmarkBtn = styled.button``;
