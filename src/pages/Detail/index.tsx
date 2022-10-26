import React from 'react';
import styled from 'styled-components';

import BookInfo from './components/BookInfo';
import ToggleButton from './components/ToggleButton';

const Detail = () => {
  return (
    <MainWrapper>
      <ContentContainer>
        <BookInfo />
        <ToggleButton />
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
