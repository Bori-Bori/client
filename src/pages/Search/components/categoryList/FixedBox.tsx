import React from 'react';
import styled from 'styled-components';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { categoryState, showCategoryState } from '../../../../recoil/search';

const FixedBox = () => {
  const category = useRecoilValue(categoryState);
  const setShowCategoty = useSetRecoilState(showCategoryState);
  return (
    <FixedBoxContainer>
      <Select onClick={() => setShowCategoty(false)} category={category.category3}>
        선택완료
      </Select>
    </FixedBoxContainer>
  );
};

export default FixedBox;

const FixedBoxContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 84px;
  padding: 30px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #ffffff 100%);
`;
const Select = styled.button<{ category: string }>`
  padding: 15px;
  border-radius: 24px;
  background-color: ${(props) => (props.category === '' ? props.theme.colors.grey5 : props.theme.colors.secondary1)};
  color: ${(props) => (props.category === '' ? props.theme.colors.grey1 : props.theme.colors.white)};
  font-weight: ${(props) => (props.category === '' ? props.theme.fontWeight.light : props.theme.fontWeight.bold)};
  @media screen and (max-width: 768px) {
    width: calc(100% - 40px);
    border-radius: 8px;
  }
`;
