import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { contentTypeState, keywordState, showCategoryState, showListState } from '../../recoil/search';

// 컴포넌트
import SearchBookList from './components/searchBookList';
import CategoryList from './components/categoryList';
import SearchBar from './components/searchBar';

const index = () => {
  const contentType = useRecoilValue(contentTypeState);
  const [showList, setShowList] = useRecoilState(showListState);
  const [showCategory, setShowCategory] = useRecoilState(showCategoryState);
  const setKeyword = useSetRecoilState(keywordState);

  useEffect(() => {
    setKeyword('');
    if (contentType === '') {
      setShowCategory(true);
      setShowList(false);
    }
    if (contentType !== '') {
      setShowList(false);
      setShowCategory(false);
    }
  }, [contentType]);

  return (
    <SearchContainer>
      <SearchBar />
      {showCategory && <CategoryList />}
      {showList && <SearchBookList />}
    </SearchContainer>
  );
};

export default index;

const SearchContainer = styled.div`
  margin: 70px auto;
  @media screen and (max-width: 768px) {
    padding: 0 20px;
  }
`;
