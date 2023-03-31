import React, { useState } from 'react';
import styled from 'styled-components';

// 리코일
import { useRecoilState, useSetRecoilState } from 'recoil';
import { mainCategoryState, subCategoryState, middleCategoryState } from '../../../../recoil/category';

// 카테고리목록
import { middlecategory, subcategory } from '../../../../types/category';
import CategoryBookList from './CategoryBookList';
import { CATEGORIES } from '../../../shared/categoryList';

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useRecoilState(mainCategoryState);
  const [selectedMiddleCategory, setSelectedMiddleCategory] = useRecoilState(middleCategoryState);
  const [selectedSubCategory, setSelectedSubCategory] = useRecoilState(subCategoryState);

  const handleCategoryChange = (category: any) => {
    setSelectedCategory(category);
    setSelectedMiddleCategory(category.middlecategories[0]);
    setSelectedSubCategory(category.middlecategories[0].subcategories[0]);
  };

  const handleMiddleCategoryChange = (middleCategory: any) => {
    setSelectedMiddleCategory(middleCategory);
    setSelectedSubCategory(middleCategory.subcategories[0]);
  };

  const handleSubCategoryChange = (subCategory: any) => {
    setSelectedSubCategory(subCategory);
  };
  return (
    <Container>
      <CategoryTitle>
        <MainSelect>
          {CATEGORIES.map((category, index) => (
            <li key={category.id}>
              <MainInput
                type="radio"
                id={category.name}
                value={category.id}
                checked={selectedCategory?.id === category.id}
                onChange={() => handleCategoryChange(category)}
              />
              <MainLabel htmlFor={category.name}>{category.name}</MainLabel>
            </li>
          ))}
        </MainSelect>

        {selectedCategory && (
          <MiddleSelect>
            {selectedCategory.middlecategories.map((middleCategory: any, index) => (
              <li key={middleCategory.id}>
                <MiddleInput
                  type="radio"
                  id={middleCategory.name}
                  value={middleCategory.id}
                  checked={selectedMiddleCategory?.id === middleCategory.id}
                  onChange={() => handleMiddleCategoryChange(middleCategory)}
                />
                <MiddleLabel htmlFor={middleCategory.name}>{middleCategory.name}</MiddleLabel>
              </li>
            ))}
          </MiddleSelect>
        )}
        {selectedMiddleCategory && (
          <SubSelect>
            {selectedMiddleCategory.subcategories.map((subCategory: any, index) => (
              <li key={subCategory.subCategoryId}>
                <SubInput
                  type="radio"
                  id={subCategory.name}
                  value={subCategory.subCategoryId}
                  checked={selectedSubCategory?.subCategoryId === subCategory.subCategoryId}
                  onChange={() => handleSubCategoryChange(subCategory)}
                />
                <SubLabel htmlFor={subCategory.name}>{subCategory.name}</SubLabel>
              </li>
            ))}
          </SubSelect>
        )}
      </CategoryTitle>
      <CategoryBookList />
    </Container>
  );
};

export default Category;
const Container = styled.section`
  padding: 10rem 0;
  @media screen and (max-width: 768px) {
    padding: 5rem 0;
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    padding: 7.9rem 0;
  }
  width: 100%;
`;
const CategoryTitle = styled.div`
  padding-left: 5.4%;
  @media screen and (max-width: 768px) {
    padding-left: 5.5%;
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    padding-left: 3.125%;
  }
`;
const MainSelect = styled.ul`
  display: flex;
  gap: 16px;
`;
const Line = styled.div`
  width: 1px;
  height: 18px;
  background-color: ${(props) => props.theme.colors.grey1};
`;

const MainInput = styled.input`
  display: none;
  :checked + label {
    font-weight: ${(props) => props.theme.fontWeight.bold};
    font-size: ${(props) => props.theme.fontSize.header01};
    color: ${(props) => props.theme.colors.black};
  }
`;
const MainLabel = styled.label`
  cursor: pointer;
  font-weight: ${(props) => props.theme.fontWeight.light};
  font-size: ${(props) => props.theme.fontSize.header01};
  color: ${(props) => props.theme.colors.grey1};
`;

const MiddleSelect = styled.ul`
  display: flex;
  gap: 20px;
  margin: 16px 0;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  li {
    padding-right: 10px;
  }
`;
const MiddleInput = styled.input`
  display: none;
  :checked + label {
    font-weight: ${(props) => props.theme.fontWeight.bold};
    font-size: ${(props) => props.theme.fontSize.body01};
    color: ${(props) => props.theme.colors.black};
  }
`;
const MiddleLabel = styled.label`
  cursor: pointer;
  white-space: nowrap;
  display: block;
  font-weight: ${(props) => props.theme.fontWeight.light};
  font-size: ${(props) => props.theme.fontSize.body02};
  color: ${(props) => props.theme.colors.grey1};
`;

const SubSelect = styled.ul`
  display: flex;
  gap: 12px;
  width: 100%;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const SubInput = styled.input`
  display: none;
  :checked + label {
    font-weight: ${(props) => props.theme.fontWeight.regular};
    font-size: ${(props) => props.theme.fontSize.body02};
    color: ${(props) => props.theme.colors.black};
    background-color: ${(props) => props.theme.colors.primary};
  }
`;
const SubLabel = styled.label`
  display: block;
  white-space: nowrap;
  border-radius: 20px;
  padding: 12px 8px;
  cursor: pointer;
  font-weight: ${(props) => props.theme.fontWeight.regular};
  font-size: ${(props) => props.theme.fontSize.body02};
  color: ${(props) => props.theme.colors.grey1};
  background-color: rgba(255, 203, 124, 0.3); ;
`;
