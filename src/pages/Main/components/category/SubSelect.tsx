import React from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { subCategoryState } from '../../../../recoil/category';

const SubSelect = () => {
  const setSubCategory = useSetRecoilState(subCategoryState);
  const subClickBtn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubCategory(e.target.id);
  };
  return (
    <Container>
      <li>
        <SubInput type="radio" name="subselect" id="🔍 추리,범죄" defaultChecked onChange={subClickBtn} />
        <SubLabel htmlFor="🔍 추리,범죄">🔍 추리,범죄</SubLabel>
      </li>
      <li>
        <SubInput type="radio" name="subselect" id="💓 로맨스" onChange={subClickBtn} />
        <SubLabel htmlFor="💓 로맨스">💓 로맨스</SubLabel>
      </li>
      <li>
        <SubInput type="radio" name="subselect" id="🥋 판타지,무협" onChange={subClickBtn} />
        <SubLabel htmlFor="🥋 판타지,무협">🥋 판타지,무협</SubLabel>
      </li>
      <li>
        <SubInput type="radio" name="subselect" id="🤖 만화,코믹" onChange={subClickBtn} />
        <SubLabel htmlFor="🤖 만화,코믹">🤖 만화,코믹</SubLabel>
      </li>
      <li>
        <SubInput type="radio" name="subselect" id="📺 고전" onChange={subClickBtn} />
        <SubLabel htmlFor="📺 고전">📺 고전</SubLabel>
      </li>
    </Container>
  );
};

export default SubSelect;
const Container = styled.ul`
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
