import React from 'react';
import styled from 'styled-components';
import { bookData } from '../../bookData';
import { useRecoilValue } from 'recoil';
import { countState } from '../../../../../recoil/slide';

//컴포넌트
import BookText from './BookText';
import BookImg from './BookImg';

const Mobile = () => {
  const count = useRecoilValue(countState);

  return (
    <MoblieContainer>
      <MoblieBg src={bookData[count]?.BOOKBG} />
      <CenterBook>
        <BookText />
        <BookImg />
      </CenterBook>
    </MoblieContainer>
  );
};

export default Mobile;

const MoblieContainer = styled.section`
  display: none;
  position: relative;
  width: 100%;
  height: 360px;
  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const MoblieBg = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-size: cover;
  background-position: center center;
`;

const CenterBook = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  padding: 24px 20px;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
`;
