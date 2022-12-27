import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useRecoilState } from 'recoil';

import { bookData } from './../bookData';
import { bookType } from '../../../../types/book';
import { countState, hoverState } from './../../../../recoil/slide';

interface IBookItem {
  hover: boolean;
  index: number;
}

const BookList = () => {
  const [bookList, setBookList] = useState<bookType>([]);
  const [count, setCount] = useRecoilState(countState);
  const [hover, setHover] = useRecoilState(hoverState);

  useEffect(() => {
    const rightList = bookData.slice().splice(0, count);
    const leftList = bookData.slice().slice(count + 1);
    setBookList([...leftList, ...rightList]);
  }, [count]);

  return (
    <BookListContainer>
      <BookListWrap
        onMouseOver={() => {
          setHover(false);
        }}
        onMouseOut={() => {
          setHover(true);
        }}
      >
        {bookList.map((value, index) => (
          <BookItem key={value.TITLE} index={index} hover={hover}>
            <BookBtn
              onClick={() => {
                setCount(value?.id);
              }}
            >
              <BookImgWrap>
                <BookImg src={value.BOOGIMG} alt="도서이미지" />
              </BookImgWrap>
            </BookBtn>
          </BookItem>
        ))}
      </BookListWrap>
    </BookListContainer>
  );
};

export default BookList;
const BookListContainer = styled.article`
  width: 33.33%; //640px
`;
const BookListWrap = styled.ul`
  position: relative;
  filter: drop-shadow(0px 10px 16px rgba(0, 0, 0, 0.12));
`;
const BookItem = styled.li<IBookItem>`
  width: 29.3%;
  position: absolute;
  top: 50%;
  transform: translateY(-20%);
  left: calc(12.5% * ${(props) => props.index});
  z-index: ${(props) => props.index + 1};

  &:hover {
    transform: translateY(-40%);
  }

  @keyframes translate {
    0% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translateY(-34%);
      left: -195%;
      width: 62%;
    }
  }

  :nth-child(1) {
    z-index: ${(props) => props.index};
    animation: translate 1.5s linear;
    animation-delay: 0.5s;
  }
`;
const BookImgWrap = styled.div`
  width: 100%;
  overflow: hidden;
`;

const BookImg = styled.img`
  width: 100%;
`;

const BookBtn = styled.button`
  display: block;
  background-color: transparent;
  border: 0;
  cursor: pointer;
`;
