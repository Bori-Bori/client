import React, { useState } from 'react';
import styled from 'styled-components';
import comment from '../../assets/icons/comment-wh-24.png';
import user from '../../assets/icons/user-wh-24.png';
import bookmark from '../../assets/icons/bookmark-default-24.png';
import BookInfo from './components/BookInfo';

const Detail = () => {
  const [moreIntro, setMoreIntro] = useState(false);

  const toggleIntro = () => {
    moreIntro ? setMoreIntro(false) : setMoreIntro(true);
  };

  return (
    <MainWrapper>
      {/* <ContentHeader></ContentHeader> */}
      <ContentContainer>
        {/* <BookDetailContainer> */}
        <BookInfo />
        {/* </BookDetailContainer> */}
      </ContentContainer>
    </MainWrapper>
  );
};

export default Detail;

const MainWrapper = styled.div`
  width: 100%;
  position: relative;
  &::before {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(http://image.yes24.com/goods/113737324/XL);
    background-position: center;
    -webkit-filter: blur(5px);
    -moz-filter: blur(5px);
    -o-filter: blur(5px);
    -ms-filter: blur(5px);
    filter: blur(5px);
    z-index: -1;
    content: '';
    height: 435px;
  }
`;

const ContentContainer = styled.div`
  width: 1024px;
  margin: 0 auto;
  padding: 24px;
`;

const BookDetailContainer = styled.section``;
