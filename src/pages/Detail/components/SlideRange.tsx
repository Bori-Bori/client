import React, { useState } from 'react';
import styled from 'styled-components';

type PassedValue = {
  passedValue: number;
};
const SlideRange = () => {
  const minPage = '1';
  const maxPage = '524'; //server에서 받아올 값
  const [value, setValue] = useState('1');
  const [passedValue, setPassedValue] = useState(0);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    const val = ((parseInt(e.target.value) - parseInt(minPage)) / (parseInt(maxPage) - parseInt(minPage))) * 100;
    setPassedValue(val);
  };
  return (
    <RangeWrapper>
      <RangeBar
        type="range"
        min="1"
        max={maxPage}
        step="1"
        onChange={onChange}
        value={value}
        passedValue={passedValue}
      />
      <input value={value} onChange={onChange}></input>
      <span>{value}</span>
    </RangeWrapper>
  );
};

export default SlideRange;

const RangeWrapper = styled.div`
  width: 100%;
`;

const RangeBar = styled.input<PassedValue>`
  width: 60%;
  -webkit-appearance: none;
  background: transparent;
  outline: none;

  background: linear-gradient(
    to right,
    ${(props) => props.theme.colors.primary} 0%,
    ${(props) => props.theme.colors.primary} ${(props) => props.passedValue}%,
    ${(props) => props.theme.colors.grey5} ${(props) => props.passedValue}%,
    ${(props) => props.theme.colors.grey5} 100%
  );
  border-radius: 10px;
  height: 12px;
  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 24px;
    height: 24px;
    background-color: ${(props) => props.theme.colors.primary};
    border-radius: 50%;
    cursor: pointer;
  }
`;
