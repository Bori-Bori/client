import React, { useState } from 'react';
import styled from 'styled-components';
import { categoryData } from './categoryData';

// 이미지
import comment from '../../../../assets/icons/comment-gr-16.png';
import user from '../../../../assets/icons/user-gr-16.png';
import bookmark_default from '../../../../assets/icons/bookmark-default-24.png';
import bookmark_select from '../../../../assets/icons/bookmark-select-24.png';

const CategoryBookList = () => {
  const [bookMark, setBookMark] = useState(false);

  return (
    <CategoryWrap>
      {categoryData.map((value) => {
        return (
          <li key={value?.TITLE}>
            <div>
              <BookImgWrap>
                <BookImg src={value?.TITLE_URL} alt={value?.TITLE} />
                <BookBg>
                  <button
                    onClick={() => {
                      setBookMark(!bookMark);
                    }}
                  >
                    <img src={bookMark ? bookmark_select : bookmark_default} alt="북마크" />
                  </button>
                </BookBg>
              </BookImgWrap>
              <BookWrap>
                <BookTitle>{value?.TITLE}</BookTitle>
                <BookAuthor>{value?.AUTHOR}</BookAuthor>
                <BookContent>
                  <li>
                    <img src={comment} alt="댓글아이콘" />
                    <span> 12</span>
                  </li>
                  <li>
                    <img src={user} alt="유저아이콘" />
                    <span> 3</span>
                  </li>
                </BookContent>
              </BookWrap>
            </div>
          </li>
        );
      })}
    </CategoryWrap>
  );
};

export default CategoryBookList;

const CategoryWrap = styled.ul`
  width: 61rem;
  margin-left: 5.4%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.25rem;
  margin-top: 1.25rem;
  @media screen and (max-width: 768px) {
    width: 90%;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-left: 5.5%;
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 90%;
    gap: 1rem;
    grid-template-columns: repeat(4, 1fr);
    margin-left: 3.125%;
  }
`;
const BookBg = styled.div`
  display: none;
  padding: 14px 16px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 80px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%);
`;

const BookImgWrap = styled.div`
  margin-bottom: 14px;
  filter: drop-shadow(0px 12px 30px rgba(0, 0, 0, 0.3));
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  :hover ${BookBg} {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
`;

const BookImg = styled.img`
  width: 100%;
`;

const BookWrap = styled.div`
  width: 10.3rem;
  margin: 0 auto;
`;

const BookTitle = styled.h3`
  width: 100%;
  text-align: center;
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
  text-align: center;
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
  align-items: center;
  @media screen and (max-width: 768px) {
    justify-content: center;
  }
  li {
    display: flex;
    align-items: center;
    gap: 7.69px;
    font-weight: ${(props) => props.theme.fontWeight.regular};
    font-size: ${(props) => props.theme.fontSize.body02};
    color: ${(props) => props.theme.colors.grey1};
    @media screen and (max-width: 768px) {
      justify-content: center;
    }
  }
`;
