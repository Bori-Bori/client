import React from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { middleCategoryState } from '../../../../recoil/category';

const MiddleSelect = () => {
  const setMiddleselect = useSetRecoilState(middleCategoryState);
  const middleClickBtn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMiddleselect(e.target.id);
  };
  return (
    <Container>
      <li>
        <MiddleInput type="radio" name="middleselect" id="전체" defaultChecked onChange={middleClickBtn} />
        <MiddleLabel htmlFor="전체">전체</MiddleLabel>
      </li>
      <li>
        <MiddleInput type="radio" name="middleselect" id="소설" onChange={middleClickBtn} />
        <MiddleLabel htmlFor="소설">소설</MiddleLabel>
      </li>
      <li>
        <MiddleInput type="radio" name="middleselect" id="경제,경영" onChange={middleClickBtn} />
        <MiddleLabel htmlFor="경제,경영">경제,경영</MiddleLabel>
      </li>
      <li>
        <MiddleInput type="radio" name="middleselect" id="인문학" onChange={middleClickBtn} />
        <MiddleLabel htmlFor="인문학">인문학</MiddleLabel>
      </li>
      <li>
        <MiddleInput type="radio" name="middleselect" id="청소년" onChange={middleClickBtn} />
        <MiddleLabel htmlFor="청소년">청소년</MiddleLabel>
      </li>
      <li>
        <MiddleInput type="radio" name="middleselect" id="어린이" onChange={middleClickBtn} />
        <MiddleLabel htmlFor="어린이">어린이</MiddleLabel>
      </li>
      <li>
        <MiddleInput type="radio" name="middleselect" id="여행" onChange={middleClickBtn} />
        <MiddleLabel htmlFor="여행">여행</MiddleLabel>
      </li>
      <li>
        <MiddleInput type="radio" name="middleselect" id="요리,살림" onChange={middleClickBtn} />
        <MiddleLabel htmlFor="요리,살림">요리,살림</MiddleLabel>
      </li>
      <li>
        <MiddleInput type="radio" name="middleselect" id="건강,취미" onChange={middleClickBtn} />
        <MiddleLabel htmlFor="건강,취미">건강,취미</MiddleLabel>
      </li>
      <li>
        <MiddleInput type="radio" name="middleselect" id="사회과학" onChange={middleClickBtn} />
        <MiddleLabel htmlFor="사회과학">사회과학</MiddleLabel>
      </li>
      <li>
        <MiddleInput type="radio" name="middleselect" id="예술" onChange={middleClickBtn} />
        <MiddleLabel htmlFor="예술">예술</MiddleLabel>
      </li>
    </Container>
  );
};

export default MiddleSelect;

const Container = styled.ul`
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
