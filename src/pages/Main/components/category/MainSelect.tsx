import React from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { mainCategoryState } from './../../../../recoil/category';

const MainSelect = () => {
  const setMainselect = useSetRecoilState(mainCategoryState);
  const mainClickBtn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMainselect(e.target.id);
  };
  return (
    <Container>
      <li>
        <MainInput type="radio" name="mainselect" id="국내" defaultChecked onChange={mainClickBtn} />
        <MainLabel htmlFor="국내">국내</MainLabel>
      </li>
      <li>
        <Line />
      </li>
      <li>
        <MainInput type="radio" name="mainselect" id="외국" onChange={mainClickBtn} />
        <MainLabel htmlFor="외국">외국</MainLabel>
      </li>
    </Container>
  );
};

export default MainSelect;
const Container = styled.ul`
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
