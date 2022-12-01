import React from 'react';
import styled from 'styled-components';

// 리코일
import { useRecoilValue } from 'recoil';
import { mainCategoryState, middleCategoryState, subCategoryState } from './../../../../recoil/category';

// 컴포넌트
import SubSelect from './SubSelect';
import MiddleSelect from './MiddleSelect';
import MainSelect from './MainSelect';
import CategoryBookList from './CategoryBookList';

const Category = () => {
  const mainselect = useRecoilValue(mainCategoryState);
  const middleselect = useRecoilValue(middleCategoryState);
  const subselect = useRecoilValue(subCategoryState);

  return (
    <Container>
      <CategoryTitle>
        <MainSelect />
        {mainselect === '국내' && <MiddleSelect />}
        {mainselect === '국내' && middleselect === '전체' && <SubSelect />}
      </CategoryTitle>
      {mainselect === '국내' && middleselect === '전체' && subselect === '🔍 추리,범죄' && <CategoryBookList />}
    </Container>
  );
};

export default Category;

const Container = styled.section`
  margin: 10rem 0;
  @media screen and (max-width: 768px) {
    margin: 5rem 0;
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    margin: 7.9rem 0;
  }
  width: 100%;
`;

const CategoryTitle = styled.div`
  margin-left: 5.4%;
  @media screen and (max-width: 768px) {
    margin-left: 5.5%;
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    margin-left: 3.125%;
  }
`;
