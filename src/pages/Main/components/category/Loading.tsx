import React from 'react';
import styled from 'styled-components';

const Loading = () => {
  return (
    <>
      <ListItem>
        <BookImg />
        <BookWrap>
          <BookTitle />
          <BookAuthor />
          <BookContent />
        </BookWrap>
      </ListItem>
      <ListItem>
        <BookImg />
        <BookWrap>
          <BookTitle />
          <BookAuthor />
          <BookContent />
        </BookWrap>
      </ListItem>
      <ListItem>
        <BookImg />
        <BookWrap>
          <BookTitle />
          <BookAuthor />
          <BookContent />
        </BookWrap>
      </ListItem>
      <ListItem>
        <BookImg />
        <BookWrap>
          <BookTitle />
          <BookAuthor />
          <BookContent />
        </BookWrap>
      </ListItem>
      <ListItem>
        <BookImg />
        <BookWrap>
          <BookTitle />
          <BookAuthor />
          <BookContent />
        </BookWrap>
      </ListItem>
    </>
  );
};

export default Loading;

const ListItem = styled.li`
  display: block;
`;
const BookImg = styled.div`
  width: 100%;
  height: 265px;
  max-height: 264px;
  @media screen and (max-width: 768px) {
    max-height: 302px;
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    max-height: 312px;
  }
  margin-bottom: 14px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  background-color: #f2f2f2;
  @keyframes loading {
    0% {
      transform: translateX(0);
    }
    50%,
    100% {
      transform: translateX(360px);
    }
  }
  :before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 180px;
    height: 100%;
    background: linear-gradient(to right, #f2f2f2, #ececec, #f2f2f2);
    animation: loading 1s infinite linear;
  }
`;

const BookWrap = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const BookTitle = styled.h3`
  width: 80%;
  height: 20px;
  overflow: hidden;
  position: relative;
  background-color: #f2f2f2;
  border-radius: 8px;
  @keyframes loading {
    0% {
      transform: translateX(0);
    }
    50%,
    100% {
      transform: translateX(360px);
    }
  }
  :before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 180px;
    height: 100%;
    background: linear-gradient(to right, #f2f2f2, #ececec, #f2f2f2);
    animation: loading 1s infinite linear;
  }
`;

const BookAuthor = styled.p`
  width: 60%;
  height: 20px;
  overflow: hidden;
  position: relative;
  background-color: #f2f2f2;
  border-radius: 8px;
  @keyframes loading {
    0% {
      transform: translateX(0);
    }
    50%,
    100% {
      transform: translateX(360px);
    }
  }
  :before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 180px;
    height: 100%;
    background: linear-gradient(to right, #f2f2f2, #ececec, #f2f2f2);
    animation: loading 1s infinite linear;
  }
  @media screen and (max-width: 768px) {
    text-align: center;
  }
  margin-top: 2px;
  margin-bottom: 15px;
`;

const BookContent = styled.ul`
  display: flex;
  gap: 19px;

  @media screen and (max-width: 768px) {
    justify-content: center;
    text-align: center;
  }
  width: 20%;
  height: 20px;
  overflow: hidden;
  position: relative;
  background-color: #f2f2f2;
  border-radius: 8px;
  @keyframes loading {
    0% {
      transform: translateX(0);
    }
    50%,
    100% {
      transform: translateX(360px);
    }
  }
  :before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 180px;
    height: 100%;
    background: linear-gradient(to right, #f2f2f2, #ececec, #f2f2f2);
    animation: loading 1s infinite linear;
  }
`;
