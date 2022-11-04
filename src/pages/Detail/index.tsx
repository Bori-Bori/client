import React, { useState } from 'react';
import styled from 'styled-components';

import BookInfo from './components/BookInfo';
import Comment from './components/Comment';
import InputCommentWithPage from './components/InputCommentWithPage';
import SortingComment from './components/SortingComment';

const Detail = () => {
  const onClick = () => {
    console.log('this is comment test');
  };

  return (
    <MainWrapper>
      <ContentContainer>
        <BookInfo />
        <SortingComment />
        <Comment />
        {/* <InputComment className="대댓글" onClick={onClick} placeholder="대댓글을 입력하세요" /> */}
        <InputCommentWithPage className="댓글" onClick={onClick} placeholder="댓글을 입력하세요" />
      </ContentContainer>
    </MainWrapper>
  );
};

export default Detail;

const MainWrapper = styled.div`
  overflow: hidden;
  min-height: 100vh;
  position: relative;
  padding-bottom: 200px;
  &::before {
    content: '';
    position: absolute;
    height: 445px;
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
    z-index: -10;
  }
  &::after {
    content: '';
    position: absolute;
    top: 430px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${(props) => props.theme.colors.white};
    z-index: -1;
  }
`;

const ContentContainer = styled.div`
  position: relative;
  width: 1024px;
  margin: 0 auto;
  padding: 24px;
  box-sizing: content-box;
`;
