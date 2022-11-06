import React, { useEffect, useState } from 'react';
import { BookList } from '../types/book';
import bookmark_default from '../assets/icons/bookmark-default-24.png';
import bookmark_select from '../assets/icons/bookmark-select-24.png';
import comment from '../assets/icons/comment-gr-16.png';
import user from '../assets/icons/user-gr-16.png';
import styled from 'styled-components';

const Home = () => {
  const [bookData, setBookData] = useState<BookList>([
    {
      TITLE: '이토록 평범한 미래',
      AUTHOR: '김연수',
      KDC: '단편소설',
      SUBJECT: '국내',
      TITLE_URL: 'http://image.yes24.com/goods/113737429/XL',
    },
    {
      TITLE: '아버지의 해방일지',
      AUTHOR: '정지아',
      KDC: '한국소설',
      SUBJECT: '국내',
      TITLE_URL: 'http://image.yes24.com/goods/112253263/XL',
    },
    {
      TITLE: '클로버',
      AUTHOR: '나혜림',
      KDC: '단편소설',
      SUBJECT: '국내',
      TITLE_URL: 'http://image.yes24.com/goods/112618165/XL',
    },
    {
      TITLE: '위대한 과학 고전 30권을 1권으로 읽는 책',
      AUTHOR: '김성근',
      KDC: '자연과학',
      SUBJECT: '국내',
      TITLE_URL: 'http://image.yes24.com/goods/113417774/XL',
    },
    {
      TITLE: '트렌드 코리아 2023',
      AUTHOR: '김난도, 전미영, 최지혜, 이수진, 권정윤',
      KDC: '경제 경영',
      SUBJECT: '국내',
      TITLE_URL: 'http://image.yes24.com/goods/113416767/XL',
    },
    {
      TITLE: '불편한 편의점 2',
      AUTHOR: '김호연',
      KDC: '한국소설',
      SUBJECT: '국내',
      TITLE_URL: 'http://image.yes24.com/goods/111088149/XL',
    },
    {
      TITLE: '세상에서 가장 쉬운 본질육아',
      AUTHOR: '지나영',
      KDC: '육아',
      SUBJECT: '국내',
      TITLE_URL: 'http://image.yes24.com/goods/113450177/XL',
    },
    {
      TITLE: '하얼빈',
      AUTHOR: '김훈',
      KDC: '한국소설',
      SUBJECT: '국내',
      TITLE_URL: 'http://image.yes24.com/goods/111085946/XL',
    },
  ]);

  const [count, setCount] = useState<number>(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);
    if (count === 7) {
      clearInterval(id);
      setCount(0);
    }
    return () => clearInterval(id);
  }, [count]);
  return (
    <Container>
      <HotBookRank>
        <div>
          <Title>🔥 이번주 HOT 도서</Title>
        </div>
        <BookWrap>
          <FirstBook key={bookData[count].TITLE}>
            <BookImgWrap>
              <BookImg src={bookData[count].TITLE_URL} alt="도서이미지" />
              <BookBackgound>
                <BookmarkBtn>
                  <img src={bookmark_default} alt="찜" />
                </BookmarkBtn>
              </BookBackgound>
            </BookImgWrap>
            <BookTextWrap>
              <Number>{count + 1}</Number>
              <Subject>
                <span>#{bookData[count].SUBJECT}</span>
                <span>#{bookData[count].KDC}</span>
              </Subject>
              <BookTitle>{bookData[count].TITLE}</BookTitle>
              <BookAuthor>{bookData[count].AUTHOR}</BookAuthor>
              <BookContent>
                <li>
                  <img src={comment} alt="댓글아이콘" />
                  <span> 12</span>
                </li>
                <li>
                  <img src={user} alt="유저아이콘" />
                  <span> 3</span>
                </li>
              </BookContent>
            </BookTextWrap>
          </FirstBook>
          <BookListWrap>
            {bookData.map(
              (value, index) =>
                index !== count && (
                  <li key={value.TITLE}>
                    <BookImgWrap>
                      <BookImg src={value.TITLE_URL} alt="도서이미지" />
                    </BookImgWrap>
                  </li>
                ),
            )}
          </BookListWrap>
        </BookWrap>
      </HotBookRank>
      <section></section>
    </Container>
  );
};

export default Home;
const Container = styled.div`
  max-width: 1024px;
  min-width: 360px;
  width: 80%;
  margin: 0 auto;
`;
const HotBookRank = styled.section`
  background-color: ${(props) => props.theme.colors.grey5};
  height: 394px;
  padding: 40px 24px;
`;
const Title = styled.h1`
  color: ${(props) => props.theme.colors.black};
  font-size: ${(props) => props.theme.fontSize.header01};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  margin-bottom: 18px;
`;
const BookBackgound = styled.div`
  display: none;
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 100%;
  height: 80px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%);
`;
const BookTextWrap = styled.div`
  width: 192px;
`;
const BookImgWrap = styled.div`
  width: 152px;
  height: 226px;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  &:hover ${BookBackgound} {
    display: block;
  }
`;
const BookImg = styled.img`
  width: 100%;
`;
const BookListWrap = styled.ul`
  position: relative;
  li:nth-child(1) {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  li:nth-child(2) {
    position: absolute;
    left: 70px;
    top: 50%;
    transform: translateY(-50%);
  }
  li:nth-child(3) {
    position: absolute;
    left: calc(70px * 2);
    top: 50%;
    transform: translateY(-50%);
  }
  li:nth-child(4) {
    position: absolute;
    left: calc(70px * 3);
    top: 50%;
    transform: translateY(-50%);
  }
  li:nth-child(5) {
    position: absolute;
    left: calc(70px * 4);
    top: 50%;
    transform: translateY(-50%);
  }
  li:nth-child(6) {
    position: absolute;
    left: calc(70px * 5);
    top: 50%;
    transform: translateY(-50%);
  }
  li:nth-child(7) {
    position: absolute;
    left: calc(70px * 6);
    top: 50%;
    transform: translateY(-50%);
  }
  li:nth-child(8) {
    position: absolute;
    left: calc(70px * 7);
    top: 50%;
    transform: translateY(-50%);
  }
`;

const BookmarkBtn = styled.button`
  position: absolute;
  right: 16.5px;
  bottom: 12.25px;
`;
const FirstBook = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Number = styled.p`
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: 80px;
  color: ${(props) => props.theme.colors.grey4};
  line-height: 95px;
  margin-bottom: 10px;
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
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: ${(props) => props.theme.fontSize.header02};
  color: ${(props) => props.theme.colors.black};
  margin-top: 8px;
  margin-bottom: 2px;
`;
const BookAuthor = styled.p`
  font-weight: ${(props) => props.theme.fontWeight.regular};
  font-size: ${(props) => props.theme.fontSize.body02};
  color: ${(props) => props.theme.colors.grey1};
`;
const BookWrap = styled.div`
  display: flex;
`;
const BookContent = styled.ul`
  li {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  display: flex;
  align-items: center;
  gap: 19px;
  margin-top: 12px;
`;
