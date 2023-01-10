import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { useRecoilState } from 'recoil';
import { countState } from '../../../../../recoil/slide';
import { bookData } from '../../bookData';

import left from '../../../../../assets/icons/main_prv_wh_24.png';
import right from '../../../../../assets/icons/main_nxt_wh_24.png';

const BookImg = () => {
  const [count, setCount] = useRecoilState(countState);

  function minus() {
    if (count === 0) {
      setCount(9);
    } else {
      setCount(count - 1);
    }
  }

  function plus() {
    if (count === 9) {
      setCount(0);
    } else {
      setCount(count + 1);
    }
  }

  return (
    <ImgWrap>
      <Btns>
        <button onClick={minus}>
          <img src={left} />
        </button>
        <button onClick={plus}>
          <img src={right} />
        </button>
      </Btns>
      <CenterBookImg to={`/detail/${bookData[count]?.TITLE_URL}`}>
        <Img src={bookData[count]?.BOOGIMG} alt="도서이미지" />
      </CenterBookImg>
    </ImgWrap>
  );
};

export default BookImg;

const ImgWrap = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: -20px;
  gap: 45px;
  right: 20px;
  width: 132px;
  height: 300px;
`;

const CenterBookImg = styled(Link)`
  display: block;
  height: 210px;
  filter: drop-shadow(-30px 30px 30px rgba(74, 45, 0, 0.24));
`;

const Btns = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const Img = styled.img`
  width: 100%;
`;
