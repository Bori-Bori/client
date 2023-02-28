import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import BookInfo from './components/bookInfo/BookInfo';
import SortingComment from './components/sorting/SortingComment';
import Comment from './components/comment/Comment';
import ToggleInputComment from './components/comment/ToggleInputComment';
import ToggelInputCommentMoblie from './components/comment/ToggleInputCommentMoblie';
import bookImageAtom from '../../recoil/bookImage';

type bookImageType = {
  bookImage: string;
};
const Detail = () => {
  const bookImage = useRecoilValue(bookImageAtom);
  return (
    <MainWrapper bookImage={bookImage}>
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

const MainWrapper = styled.div<bookImageType>`
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
    background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${(props) => props.bookImage});
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
