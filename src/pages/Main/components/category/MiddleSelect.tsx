import React from 'react';
import styled from 'styled-components';

// 리코일
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { mainCategoryState, middleCategoryState } from '../../../../recoil/category';

// 카테고리목록
import { CATEGORIES } from './categoryList';
import { middlecategory } from '../../../../types/category';

const MiddleSelect = () => {
  const mainCategory = useRecoilValue(mainCategoryState);
  const setMiddleCategory = useSetRecoilState(middleCategoryState);

  const middleCategoryList = CATEGORIES.find((main) => main.name === mainCategory)?.middlecategories;
  return (
    <MiddleSelectWrap>
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
    </MiddleSelectWrap>
  );
};

export default MiddleSelect;

const MiddleSelectWrap = styled.ul`
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
  :checked ~ label {
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
