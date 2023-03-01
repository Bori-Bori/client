import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import BookList from './BookList';
import FirstBook from './FirstBook';
import { countState, hoverState } from './../../../../recoil/slide';

const Slide = () => {
  const [count, setCount] = useRecoilState(countState);
  const hover = useRecoilValue(hoverState);
  useEffect(() => {
    if (hover) {
      const id = setInterval(() => {
        setCount((count) => count + 1);
        if (count === 9) {
          clearInterval(id);
          setCount(0);
        }
      }, 3000);
      return () => clearInterval(id);
    }
  }, [count, hover]);

  return (
    <Container>
      <HotBookRank>
        <FirstBook />
        <BookList />
      </HotBookRank>
    </Container>
  );
};

export default Slide;

const Container = styled.section`
  width: 100%;
  height: 63.7vh;
  background: linear-gradient(97.15deg, #fff6d7 21.51%, #d7f4ec 79.56%);
  @media screen and (max-width: 1024px) {
    display: none;
    max-width: 1024px;
  }
`;

const HotBookRank = styled.div`
  width: 93.75%;
  height: 100%;
  padding: 0 3.125%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
