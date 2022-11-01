import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { bookType } from '../../../types/book';

import { bookData } from './bookData';

import bookmark_default from '../../../assets/icons/bookmark-default-24.png';
import bookmark_select from '../../../assets/icons/bookmark-select-24.png';
import comment from '../../../assets/icons/common_comment_gr_24.png';
import user from '../../../assets/icons/common_user_gr_24.png';

const Home = () => {
  const [count, setCount] = useState<number>(0);
  const [bookMark, setBookMark] = useState(false);
  const [bookData2, setBookData2] = useState<bookType>([]);
  const [hover, setHover] = useState(true);

  useEffect(() => {
    if (hover) {
      const id = setInterval(() => {
        setCount((count) => count + 1);
        if (count === 9) {
          clearInterval(id);
          setCount(0);
        }
      }, 2000);
      return () => clearInterval(id);
    }
  }, [count, hover]);

  useEffect(() => {
    const bookData1 = bookData.slice();
    const bookData2 = bookData.slice();
    const rightList = bookData1.splice(0, count);
    const leftList = bookData2.slice(count + 1);
    setBookData2(leftList.concat(rightList));
  }, [count]);
  return (
    <Container>
      <HotBookRank>
        <BookWrap>
          <FirstBook>
            <FirstBookImgWrap>
              <BookImg src={bookData[count].TITLE_URL} alt="도서이미지" />
            </FirstBookImgWrap>
            <BookTextWrap>
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
            </BookTextWrap>
          </FirstBook>
          <BookListWrap
            onMouseOver={() => {
              setHover(false);
            }}
            onMouseOut={() => {
              setHover(true);
            }}
          >
            {bookData2.map((value) => (
              <BookItem key={value.TITLE}>
                <BookBtn
                  onClick={() => {
                    setCount(value?.id);
                  }}
                >
                  <BookImgWrap>
                    <BookImg src={value.TITLE_URL} alt="도서이미지" />
                  </BookImgWrap>
                </BookBtn>
              </BookItem>
            ))}
          </BookListWrap>
        </BookWrap>
      </HotBookRank>
      <section />
    </Container>
  );
};

export default Home;
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
const BookTextWrap = styled.div`
  width: 240px;
`;
const FirstBookImgWrap = styled.div`
  width: 264px;
  height: 420px;
  position: relative;
  overflow: hidden;
`;
const BookmarkBtn = styled.button``;
const FirstBook = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
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
const Container = styled.div`
  width: 100%;
  background: linear-gradient(97.15deg, #fff6d7 21.51%, #d7f4ec 79.56%);
`;
const HotBookRank = styled.section`
  max-width: 1024px;
  min-width: 360px;
  margin: 0 auto;
  height: 495px;
  padding: 40px 24px;
  overflow: hidden;
`;
const BookBtn = styled.button`
  background-color: transparent;
  border: 0;
  cursor: pointer;
`;
const BookImgWrap = styled.div`
  width: 92px;
  height: 148px;
  position: relative;
  overflow: hidden;
`;
const BookImg = styled.img`
  width: 100%;
`;
const BookItem = styled.li`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  :hover {
    top: 43%;
  }
  @keyframes translate {
    0% {
      left: 0;
      transform: scale(1);
      top: 50%;
      transform: translateY(-50%);
    }
    100% {
      top: calc(50% - 73px);
      left: -490px;
      transform: translateY(-50%);
      transform: scale(2.9);
    }
  }
  :nth-child(1) {
    animation: translate 2s linear;
    z-index: 1;
  }
  :nth-child(2) {
    left: calc(40px * 1);
    z-index: 2;
  }
  :nth-child(3) {
    left: calc(40px * 2);
    z-index: 3;
  }
  :nth-child(4) {
    left: calc(40px * 3);
    z-index: 4;
  }
  :nth-child(5) {
    left: calc(40px * 4);
    z-index: 5;
  }
  :nth-child(6) {
    left: calc(40px * 5);
    z-index: 6;
  }
  :nth-child(7) {
    left: calc(40px * 6);
    z-index: 7;
  }
  :nth-child(8) {
    left: calc(40px * 7);
    z-index: 8;
  }
  :nth-child(9) {
    left: calc(40px * 8);
    z-index: 9;
  }
  :nth-child(10) {
    left: calc(40px * 9);
    z-index: 10;
  }
`;
const BookListWrap = styled.ul`
  position: relative;
  width: 412px;
`;

const BookWrap = styled.div`
  display: flex;
  gap: 60px;
`;
