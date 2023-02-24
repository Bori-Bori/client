import React from 'react';
import styled from 'styled-components';

import BookInfo from './components/BookInfo';
import SortingComment from './components/SortingComment';
import Comment from './components/Comment';
import ToggleInputComment from './components/ToggleInputComment';
import ToggelInputCommentMoblie from './components/ToggleInputCommentMoblie';

type BookISBN = {
  bookISBN: string;
};

const Detail = () => {
  return (
    <MainWrapper>
      <ContentContainer>
        <BookInfo />
        <SortingComment />
        <Comment />
        <ToggleInputComment />
        <ToggelInputCommentMoblie />
      </ContentContainer>
    </MainWrapper>
  );
};

export default Detail;

const MainWrapper = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    height: 435px;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: 0;
    background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(http://image.yes24.com/goods/113737324/XL);
    background-position: center;
    background-size: 100% 300%;
    -webkit-filter: blur(10px);
    -moz-filter: blur(10px);
    -o-filter: blur(10px);
    -ms-filter: blur(10px);
    filter: blur(10px);
    z-index: -1;
  }
  &::after {
    content: '';
    position: absolute;
    top: 420px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${(props) => props.theme.colors.white};
    z-index: -1;
  }
  ${(props) => props.theme.media.tablet`
    
    &::before {
      top: -50px;
    }
    &:after {
      top: 370px;
    }
  `}
`;

const ContentContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1024px;
  margin: 70px auto;
  /* padding: 24px; */
  ${(props) => props.theme.media.tablet`
  // padding: 0 20px;
  `}
`;
