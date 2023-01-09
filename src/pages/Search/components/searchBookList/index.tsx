import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { categoryState, keywordState } from '../../../../recoil/search';
import SearchList from './SearchList';

const SearchBookList = () => {
  const category = useRecoilValue(categoryState); // 카테고리1/2/3
  const { category3 } = category; // 카테고리3 꺼내기
  const keyword = useRecoilValue(keywordState); // 검색어

  return (
    <SearchContainer>
      <SearchInfo>&#34;{category3 === '' ? keyword : category3}&#34; 검색결과</SearchInfo>
      <SearchList />
    </SearchContainer>
  );
};

export default SearchBookList;

const SearchContainer = styled.div`
  width: 1024px;
  margin: 0 auto;
  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`;
const SearchInfo = styled.p`
  margin-top: 28px;
  margin-bottom: 16px;
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: ${(props) => props.theme.fontSize.header02};
  color: ${(props) => props.theme.colors.grey1};
`;
