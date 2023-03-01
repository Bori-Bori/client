import React, { useEffect, ChangeEvent, KeyboardEvent } from 'react';

import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import {
  categoryState,
  contentTypeState,
  keywordState,
  showCategoryState,
  showListState,
} from '../../../../recoil/search';

// 이미지
import search from '../../../../assets/icons/common_search_br_24.png';
import ContentType from './ContentType';

const searchBar = () => {
  const [category, setCategory] = useRecoilState(categoryState);
  const contentType = useRecoilValue(contentTypeState);
  const [keyword, setKeyword] = useRecoilState(keywordState);
  const setShowList = useSetRecoilState(showListState);
  const setShowCategory = useSetRecoilState(showCategoryState);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (contentType !== '') {
      setKeyword(e.target.value);
    }
  };

  const searchEvent = () => {
    if (contentType !== '' && keyword === '') {
      return alert('검색어를 입력하세요');
    }
    if (contentType !== '') {
      setKeyword(keyword);
      setShowList(true);
    }
    if (contentType === '') {
      setKeyword('');
      setShowList(true);
    }
  };
  const handleKeyPress = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter') {
      searchEvent();
    }
  };
  const searchEventHandler = () => {
    setShowCategory(true);
    setShowList(false);
    setCategory({ category1: '', category2: '', category3: '' });
  };

  useEffect(() => {
    if (contentType === '') {
      setKeyword('');
    } else if (contentType !== '') {
      setCategory({ category1: '', category2: '', category3: '' });
    }
  }, [contentType]);

  return (
    <SearchBarContainer>
      <ContentType />
      {contentType !== '' ? (
        <SearchInput
          placeholder="어떤 책을 찾으세요?"
          onChange={onChange}
          onKeyPress={handleKeyPress}
          defaultValue={keyword}
        />
      ) : (
        <SelectCategory onClick={searchEventHandler} category={category.category3}>
          {category.category3 === '' ? '카테고리를 선택해주세요.' : category.category3}
        </SelectCategory>
      )}
      <button onClick={searchEvent}>
        <SearchIcon src={search} alt="검색아이콘" />
      </button>
    </SearchBarContainer>
  );
};

export default searchBar;

const SearchBarContainer = styled.header`
  width: 680px;
  margin: 0 auto;
  padding: 0 24px;
  background-color: rgba(255, 203, 124, 0.6);
  border-radius: 60px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding-top: 22px;
  padding-bottom: 20px;
  @media screen and (max-width: 768px) {
    padding-top: 16px;
    padding-bottom: 14px;
    margin-left: 10.5px;
  }
  background-color: transparent;
  border: 0;
  outline: none;
  margin-left: 20px;
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: ${(props) => props.theme.fontSize.header02};
  color: ${(props) => props.theme.colors.black};
  ::placeholder {
    color: ${(props) => props.theme.colors.grey1};
  }
`;
const SearchIcon = styled.img`
  width: 24px;
  height: 24px;
`;
const SelectCategory = styled.button<{ category: string }>`
  text-align: left;
  width: 100%;
  padding-top: 22px;
  padding-bottom: 20px;
  background-color: transparent;
  margin-left: 20px;
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: ${(props) => props.theme.fontSize.header02};
  color: ${(props) => (props.category === '' ? props.theme.colors.grey1 : props.theme.colors.black)};
`;
