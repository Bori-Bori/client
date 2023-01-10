import React from 'react';
import styled from 'styled-components';

// 리코일
import { useRecoilState, useSetRecoilState } from 'recoil';
import { mainCategoryState, subCategoryState, middleCategoryState } from '../../../../recoil/category';

// 카테고리목록
import { middlecategory, subcategory } from '../../../../types/category';

const SubSelect = (middleCategoryList: middlecategory[]) => {
  const [middleCategory, setMiddleCategory] = useRecoilState(middleCategoryState);
  const setSubCategory = useSetRecoilState(subCategoryState);
  const subCategorylist = middleCategoryList?.find((middle) => middle.name === middleCategory)?.subcategories;

  return (
    <SubSelectWrap>
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
    </SubSelectWrap>
  );
};

export default SubSelect;

const SubSelectWrap = styled.ul`
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
