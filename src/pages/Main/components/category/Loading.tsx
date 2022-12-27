import React from 'react';
import styled from 'styled-components';

const Loading = () => {
  return (
    <>
      <li>
        <BookImgWrap />
        <BookWrap>
          <BookTitle />
          <BookAuthor />
          <BookContent />
        </BookWrap>
      </li>
      <li>
        <BookImgWrap />
        <BookWrap>
          <BookTitle />
          <BookAuthor />
          <BookContent />
        </BookWrap>
      </li>
      <li>
        <BookImgWrap />
        <BookWrap>
          <BookTitle />
          <BookAuthor />
          <BookContent />
        </BookWrap>
      </li>
      <li>
        <BookImgWrap />
        <BookWrap>
          <BookTitle />
          <BookAuthor />
          <BookContent />
        </BookWrap>
      </li>
      <li>
        <BookImgWrap />
        <BookWrap>
          <BookTitle />
          <BookAuthor />
          <BookContent />
        </BookWrap>
      </li>
    </>
  );
};

export default Loading;

const BookImgWrap = styled.div`
  max-height: 264px;
  background-color: ${(props) => props.theme.colors.grey3};
  @media screen and (max-width: 768px) {
    max-height: 302px;
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    max-height: 312px;
  }
  margin-bottom: 14px;
  filter: drop-shadow(0px 12px 30px rgba(0, 0, 0, 0.3));
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const BookWrap = styled.div`
  width: 10.3rem;
  margin: 0 auto;
`;

const BookTitle = styled.h3`
  width: 100%;
  @media screen and (max-width: 768px) {
    text-align: center;
  }
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.375rem;
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: ${(props) => props.theme.fontSize.body01};
  color: ${(props) => props.theme.colors.black};
`;

const BookAuthor = styled.p`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media screen and (max-width: 768px) {
    text-align: center;
  }
  line-height: 1.375rem;
  font-weight: ${(props) => props.theme.fontWeight.regular};
  font-size: ${(props) => props.theme.fontSize.body02};
  color: ${(props) => props.theme.colors.grey1};
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
  li {
    display: flex;
    align-items: center;
    gap: 7.69px;
    font-weight: ${(props) => props.theme.fontWeight.regular};
    font-size: ${(props) => props.theme.fontSize.body02};
    color: ${(props) => props.theme.colors.grey1};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    @media screen and (max-width: 768px) {
      justify-content: center;
    }
  }
`;
