import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useRecoilState } from 'recoil';
import { countState, hoverState } from '../../../../recoil/slide';

import { bookType } from '../../../../types/book';
import { bookData } from '../bookData';

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
    <Container>
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
                <BookImg src={value.TITLE_URL} alt="도서이미지" />
              </BookImgWrap>
            </BookBtn>
          </BookItem>
        ))}
      </BookListWrap>
    </Container>
  );
};

export default BookList;
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const BookListWrap = styled.ul`
  width: 100%;
  height: 100%;
  filter: drop-shadow(0px 10px 16px rgba(0, 0, 0, 0.12));
`;

const BookBtn = styled.button`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  width: 100%;
`;
const BookImgWrap = styled.div`
  position: relative;
  overflow: hidden;
`;
const BookImg = styled.img`
  width: 100%;
`;
const BookItem = styled.li<IBookItem>`
  width: 8.4%;
  position: absolute;
  top: 53.4%;
  transform: translateY(-50%);
  left: calc(60% + (6% * ${(props) => props.index}));
  z-index: ${(props) => props.index + 1};
  :hover {
    top: 43%;
  }
  @keyframes translate {
    0% {
      left: 60%;
      transform: scale(1);
    }
    100% {
      left: 6%;
      transform: scale(2.3);
    }
  }
  :nth-child(1) {
    z-index: ${(props) => props.index};
    animation: translate 1s linear;
  }
`;
