import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

// 이미지
import comment from '../../../../assets/icons/comment-gr-16.png';

import { getBooklist } from './../../../../apis/category';
import { mainCategoryState, subCategoryState, middleCategoryState } from './../../../../recoil/category';

// 컴포넌트
import Loading from '../../../../components/Loading';
import Error from '../../../../components/Error';

const CategoryBookList = () => {
  const category1 = useRecoilValue(mainCategoryState);
  const category2 = useRecoilValue(middleCategoryState);
  const category3 = useRecoilValue(subCategoryState).substr(2);

  interface IbookList {
    isbn: number;
    title: string;
    imagePath: string;
    author: string;
    commentCount: number;
  }

  interface IfetchNextPage {
    isLast: boolean;
    nextPage: number;
    items: IbookList[];
  }

  const { ref, inView } = useInView();
  const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    [category1, category2, category3],
    ({ pageParam = 0 }) => getBooklist(category1, category2, category3, pageParam),
    {
      getNextPageParam: (lastPage: IfetchNextPage) => (!lastPage.isLast ? lastPage.nextPage : undefined),
    },
  );

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  if (status === 'loading') return <Loading />;
  if (status === 'error') return <Error />;

  return (
    <>
      <CategoryWrap>
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.items.map((value: IbookList) => (
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
                    </BookContent>
                  </BookWrap>
                </Link>
              </li>
            ))}
          </React.Fragment>
        ))}
      </CategoryWrap>
      {isFetchingNextPage ? <Loading /> : <div ref={ref} />}
    </>
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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    @media screen and (max-width: 768px) {
      justify-content: center;
    }
  }
`;
