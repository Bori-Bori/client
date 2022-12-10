import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { useRecoilValue } from 'recoil';
import { countState } from './../../../../../recoil/slide';
import { bookData } from './../../bookData';

// 컴포넌트
import BookText from './BookText';

const CenterBook = () => {
  const count = useRecoilValue(countState);

  return (
    <CenterBookContainer key={bookData[count]?.id}>
      <CenterBookWrap>
        <CenterBookImg to={`/detail/${bookData[count]?.TITLE_URL}`}>
          <BookImg src={bookData[count]?.BOOGIMG} alt="도서이미지" />
        </CenterBookImg>
        <BookText />
      </CenterBookWrap>
    </CenterBookContainer>
  );
};

export default CenterBook;

const CenterBookContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 68%;
  height: 100%;
  display: block;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const CenterBookWrap = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const CenterBookImg = styled(Link)`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  filter: drop-shadow(-30px 30px 30px rgba(74, 45, 0, 0.24));
  width: 264px;

  @keyframes opacityChange {
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
  @keyframes leftmove {
    0% {
    }
    100% {
      width: 15%;
      left: -20%;
      top: 50%;
      transform: translate(-50%, -50%);

      width: 100px;
    }
  }
  animation: opacityChange 1s linear, leftmove 1s linear;
  animation-delay: 1s;
`;
const BookImg = styled.img`
  width: 100%;
`;
