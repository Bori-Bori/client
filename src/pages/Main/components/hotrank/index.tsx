import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import BookList from './BookList';
import FirstBook from './FirstBook';
import { countState, hoverState } from './../../../../recoil/slide';
import Header from './../../../../components/Header';
import Tablet from './Tablet';

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
      <Header />
      <HotBookRank>
        {/* <BookList />
        <FirstBook /> */}
        <Tablet />
      </HotBookRank>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  width: 100%;
  height: 36.25rem;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    height: 27.56rem;
  }
  @media screen and (max-width: 768px) {
    height: 19.25rem;
  }
  background: linear-gradient(97.15deg, #fff6d7 21.51%, #d7f4ec 79.56%);
`;
const HotBookRank = styled.section`
  width: 100%;
  height: 100%;
`;
