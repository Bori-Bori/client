import React from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { categoryState } from '../../../../recoil/search';

import { CATEGORIES } from '../../../shared/categoryList';

// 컴포넌트
import FixedBox from './FixedBox';

const CategoryList = () => {
  const setCategory = useSetRecoilState(categoryState);

  return (
    <CategoryContainer>
      <FixedBox />
      <CategoryWrap>
        {CATEGORIES.map((category) => (
          <MainCategoryList key={category.id}>
            <MainCategory>{category.name}</MainCategory>
            {category.middlecategories.map((midcategory) => (
              <MidCategoryList key={midcategory.id}>
                <MidCategory>{midcategory.name}</MidCategory>
                <SubCategoryList>
                  {midcategory.subcategories.map((subcategory) => {
                    return (
                      <SubCategoryItem key={subcategory.subCategoryId}>
                        <SelectInput
                          type="radio"
                          name="select"
                          id={subcategory.name}
                          onChange={() =>
                            setCategory({
                              category1: category.name,
                              category2: midcategory.name,
                              category3: subcategory.name,
                            })
                          }
                        />
                        <SelectLabel htmlFor={subcategory.name}>{subcategory.name}</SelectLabel>
                      </SubCategoryItem>
                    );
                  })}
                </SubCategoryList>
              </MidCategoryList>
            ))}
          </MainCategoryList>
        ))}
      </CategoryWrap>
    </CategoryContainer>
  );
};

export default CategoryList;

const CategoryContainer = styled.main`
  width: 680px;
  margin: 20px auto;
  @media screen and (max-width: 768px) {
    width: 100%;
    display: block;
  }
`;
const CategoryWrap = styled.div`
  display: flex;
  gap: 40px;
`;
const MainCategoryList = styled.div`
  width: 50%;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
const MainCategory = styled.h2`
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: ${(props) => props.theme.fontSize.header01};
  color: ${(props) => props.theme.colors.black};
  margin-bottom: 20px;
  @media screen and (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

const MidCategoryList = styled.div`
  margin-bottom: 20px;
`;
const MidCategory = styled.h3`
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: ${(props) => props.theme.fontSize.body02};
  color: ${(props) => props.theme.colors.grey1};
  margin-bottom: 10px;
`;
const SubCategoryList = styled.ul`
  display: flex;
  gap: 8px 10px;
  flex-wrap: wrap;
`;
const SubCategoryItem = styled.li`
  display: block;
`;

const SelectInput = styled.input`
  display: none;
  :checked + label {
    font-weight: ${(props) => props.theme.fontWeight.bold};
    font-size: ${(props) => props.theme.fontSize.body02};
    color: ${(props) => props.theme.colors.black};
    background-color: ${(props) => props.theme.colors.primary};
  }
`;

const SelectLabel = styled.label`
  cursor: pointer;
  display: block;
  padding: 8px 12px;
  border: 1px solid ${(props) => props.theme.colors.grey4};
  border-radius: 20px;
  font-weight: ${(props) => props.theme.fontWeight.regular};
  font-size: ${(props) => props.theme.fontSize.body02};
  color: ${(props) => props.theme.colors.black};
`;
