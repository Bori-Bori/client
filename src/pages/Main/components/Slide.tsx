import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { countState, hoverState } from './../../../recoil/slide';
import BookList from './BookList';
import FirstBook from './FirstBook';

const Home = () => {
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
      }, 2000);
      return () => clearInterval(id);
    }
  }, [count, hover]);

  return (
    <Container>
      <HotBookRank>
        <BookWrap>
          <FirstBook />
          <BookList />
        </BookWrap>
      </HotBookRank>
      <section />
    </Container>
  );
};

export default Home;

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

const BookWrap = styled.div`
  display: flex;
  gap: 60px;
`;
