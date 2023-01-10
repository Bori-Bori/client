import React from 'react';
import styled from 'styled-components';

import { useRecoilValue } from 'recoil';
import { bookData } from './../bookData';
import { countState } from '../../../../recoil/slide';
import { Link } from 'react-router-dom';

// 컴포넌트
import BookText from './BookText';

const FirstBook = () => {
  const count = useRecoilValue(countState);

  return (
    <FirstBookWrap>
      <FirstBookImgWrap to={`/detail/${bookData[count]?.TITLE_URL}`}>
        <BookImg src={bookData[count].BOOGIMG} alt="도서이미지" />
      </FirstBookImgWrap>
      <BookText />
    </FirstBookWrap>
  );
};

export default FirstBook;

const FirstBookWrap = styled.article`
  width: 60%; // 665px
  max-width: 665px;
  min-width: 519px;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  position: relative;
`;

const FirstBookImgWrap = styled(Link)`
  max-width: 390px;
  min-width: 264px;
  width: 50%;
  position: absolute;
  left: 5%;
  top: 65%;
  transform: translateY(-50%);
  filter: drop-shadow(-30px 30px 30px rgba(74, 45, 0, 0.24));
`;
const BookImg = styled.img`
  width: 100%;
`;
