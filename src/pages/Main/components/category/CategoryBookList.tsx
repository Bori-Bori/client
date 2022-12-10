import React from 'react';
import styled from 'styled-components';

// 이미지
import comment from '../../../../assets/icons/comment-gr-16.png';
import user from '../../../../assets/icons/user-gr-16.png';
import { useQuery } from '@tanstack/react-query';
import { getBooklist } from './../../../../apis/category';
import { useRecoilValue } from 'recoil';
import { mainCategoryState, subCategoryState, middleCategoryState } from './../../../../recoil/category';
import { Link } from 'react-router-dom';

const CategoryBookList = () => {
  const category1 = useRecoilValue(mainCategoryState);
  const category2 = useRecoilValue(middleCategoryState);
  const category3 = useRecoilValue(subCategoryState);

  const size = 10;
  const page = 0;

  interface IbookList {
    isbn: number;
    title: string;
    imagePath: string;
    author: string;
    commentCount: number;
  }
  const data = useQuery(['bookList', category1, category2, category3, size, page], () =>
    getBooklist(category1, category2, category3, size, page),
  );
  const bookList: IbookList[] = data.data?.content?.items;
  return (
    <CategoryWrap>
      {bookList?.map((value) => {
        return (
          <li key={value?.title}>
            <Link to={`/detail/${value?.isbn}`}>
              <BookImgWrap>
                <BookImg src={value?.imagePath} alt={value?.title} />
              </BookImgWrap>
              <BookWrap>
                <BookTitle>{value?.title}</BookTitle>
                <BookAuthor>{value?.author}</BookAuthor>
                <BookContent>
                  <li>
                    <img src={comment} alt="댓글아이콘" />
                    <span> {value?.commentCount}</span>
                  </li>
                  <li>
                    <img src={user} alt="유저아이콘" />
                    <span> 3</span>
                  </li>
                </BookContent>
              </BookWrap>
            </Link>
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
  max-height: 264px;
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
    @media screen and (max-width: 768px) {
      justify-content: center;
    }
  }
`;
