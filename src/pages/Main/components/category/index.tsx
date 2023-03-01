import React from 'react';
import styled from 'styled-components';

// 리코일
import { useRecoilState, useSetRecoilState } from 'recoil';
import { mainCategoryState, subCategoryState, middleCategoryState } from '../../../../recoil/category';

// 카테고리목록
import { CATEGORIES } from '../../../shared/categoryList';
import { middlecategory, subcategory } from '../../../../types/category';
import CategoryBookList from './CategoryBookList';

const Category = () => {
  const [mainCategory, setMainCategory] = useRecoilState(mainCategoryState);
  const [middleCategory, setMiddleCategory] = useRecoilState(middleCategoryState);
  const setSubCategory = useSetRecoilState(subCategoryState);

  const middleCategoryList = CATEGORIES.find((main) => main.name === mainCategory)?.middlecategories;
  const subCategorylist = middleCategoryList?.find((middle) => middle.name === middleCategory)?.subcategories;
  return (
    <Container>
      <CategoryTitle>
        <MainSelect>
          <>
            {CATEGORIES.map((mainSelect) => {
              return (
                mainSelect.id === 1 && (
                  <li key={mainSelect.id}>
                    <MainInput
                      type="radio"
                      name="mainselect"
                      id={mainSelect.name}
                      defaultChecked
                      onChange={() => setMainCategory(mainSelect.name)}
                    />
                    <MainLabel htmlFor={mainSelect.name}>{mainSelect.name}</MainLabel>
                  </li>
                )
              );
            })}

            <li>
              <Line />
            </li>
            {CATEGORIES.map((mainSelect) => {
              return (
                mainSelect.id === 2 && (
                  <li key={mainSelect.id}>
                    <MainInput
                      type="radio"
                      name="mainselect"
                      id={mainSelect.name}
                      onChange={() => setMainCategory(mainSelect.name)}
                    />
                    <MainLabel htmlFor={mainSelect.name}>{mainSelect.name}</MainLabel>
                  </li>
                )
              );
            })}
          </>
        </MainSelect>
        <MiddleSelect>
          <>
            {(middleCategoryList as middlecategory[]).map((middleSelect) => {
              return (
                middleSelect.id === 1 && (
                  <li key={middleSelect.id}>
                    <MiddleInput
                      type="radio"
                      name="middleselect"
                      id={middleSelect.name}
                      defaultChecked
                      onChange={() => setMiddleCategory(middleSelect.name)}
                    />
                    <MiddleLabel htmlFor={middleSelect.name}>{middleSelect.name}</MiddleLabel>
                  </li>
                )
              );
            })}
            {(middleCategoryList as middlecategory[]).map((middleSelect) => {
              return (
                middleSelect.id > 1 && (
                  <li key={middleSelect.id}>
                    <MiddleInput
                      type="radio"
                      name="middleselect"
                      id={middleSelect.name}
                      onChange={() => setMiddleCategory(middleSelect.name)}
                    />
                    <MiddleLabel htmlFor={middleSelect.name}>{middleSelect.name}</MiddleLabel>
                  </li>
                )
              );
            })}
          </>
        </MiddleSelect>

        <SubSelect>
          <>
            {(subCategorylist as subcategory[]).map((subSelect) => {
              return (
                subSelect.subCategoryId === 1 && (
                  <li key={subSelect.subCategoryId}>
                    <SubInput
                      type="radio"
                      name="subselect"
                      id={subSelect.name}
                      defaultChecked
                      onChange={() => setSubCategory(subSelect.name)}
                    />
                    <SubLabel htmlFor={subSelect.name}>{subSelect.name}</SubLabel>
                  </li>
                )
              );
            })}
            {(subCategorylist as subcategory[]).map((subSelect) => {
              return (
                subSelect.subCategoryId > 1 && (
                  <li key={subSelect.subCategoryId}>
                    <SubInput
                      type="radio"
                      name="subselect"
                      id={subSelect.name}
                      onChange={() => setSubCategory(subSelect.name)}
                    />
                    <SubLabel htmlFor={subSelect.name}>{subSelect.name}</SubLabel>
                  </li>
                )
              );
            })}
          </>
        </SubSelect>
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
