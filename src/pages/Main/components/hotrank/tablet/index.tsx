import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { countState } from './../../../../../recoil/slide';
import { bookData } from './../../bookData';
import { Link } from 'react-router-dom';
import CenterBook from './CenterBook';

const Tablet = () => {
  const [lastCount, setLastCount] = useState(9);
  const count = useRecoilValue(countState);

  // 왼쪽 이미지가 책목록중 마지막 책[9]부터 시작해서 인덱스가 1, 2, ...로 증가합니다.
  useEffect(() => {
    const id = setInterval(() => {
      setLastCount(count - 1);
      setLastCount((lastCount) => lastCount + 1);
      if (count === 0) {
        clearInterval(id);
        setLastCount(8);
      }
    }, 2000);
    return () => clearInterval(id);
  }, [count]);

  return (
    <Container>
      <ResponsiveWrap>
        <LeftImg to={`/detail/${bookData[lastCount]?.TITLE_URL}`}>
          <img src={bookData[lastCount]?.BOOGIMG} alt={bookData[lastCount]?.TITLE} />
        </LeftImg>
        <CenterBook />
        <RightImg key={bookData[count + 1]?.id} to={`/detail/${bookData[count + 1]?.TITLE_URL}`}>
          <img src={bookData[count + 1]?.BOOGIMG} alt={bookData[count + 1]?.TITLE} />
        </RightImg>
      </ResponsiveWrap>
    </Container>
  );
};

export default Tablet;

const Container = styled.section`
  display: none;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    display: block;
  }
  width: 100%;
  height: 441px;
  padding-top: 88px;
  background: linear-gradient(97.15deg, #fff6d7 21.51%, #d7f4ec 79.56%);
`;
const ResponsiveWrap = styled.ul`
  width: 100%;
  height: 100%;
  position: relative;
`;
const LeftImg = styled(Link)`
  display: block;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  img {
    width: 100%;
  }
`;
const RightImg = styled(Link)`
  display: block;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(50%, -50%);
  width: 100px;
  @keyframes opacitychan {
    0% {
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  @keyframes rightmove {
    0% {
    }
    100% {
      width: 264px;
      right: 515px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  animation: opacitychan 1s linear, rightmove 1s linear;
  animation-delay: 1s;
  img {
    width: 100%;
  }
`;
