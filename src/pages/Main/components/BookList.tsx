import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useRecoilState, useSetRecoilState } from 'recoil';
import { countState, hoverState } from './../../../recoil/slide';

import { bookType } from '../../../types/book';
import { bookData } from './bookData';

const BookList = () => {
  const [bookData2, setBookData2] = useState<bookType>([]);
  const [count, setCount] = useRecoilState(countState);
  const setHover = useSetRecoilState(hoverState);

  useEffect(() => {
    const bookData1 = bookData.slice();
    const bookData2 = bookData.slice();
    const rightList = bookData1.splice(0, count);
    const leftList = bookData2.slice(count + 1);
    setBookData2(leftList.concat(rightList));
  }, [count]);
  return (
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
  );
};

export default BookList;

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
