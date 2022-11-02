import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import InputPageButton from '../components/InputPageButton';
import prevButton from '../../../assets/icons/prv-bk-20.png';
import nextButton from '../../../assets/icons/nxt-bk-20.png';
import BubbleBox from '../components/BubbleBox';

type PassedValue = {
  passedValue: number;
};

type PageValue = {
  offset: any;
};

const SlideRange = () => {
  const minPage = '1';
  const maxPage = '524'; //server에서 받아올 값
  const [value, setValue] = useState('1');
  const [passedValue, setPassedValue] = useState(0);

  const [bubbleIconOffset, setBubbleIconOffset] = useState(0);
  const rangeInputRef = useRef<HTMLInputElement>(null);
  let rangeInputWidth;

  useEffect(() => {
    setTimeout(() => {
      rangeInputWidth = rangeInputRef.current!.clientWidth;
      console.log(rangeInputWidth);
      setBubbleIconOffset((parseInt(value) / rangeInputWidth) * 100);
    }, 1);
  }, [rangeInputRef, rangeInputWidth, value]);

  const onChangeRangeBar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const enteredValue = e.target.value.replace(/[^0-9.]/g, '');
    setValue(enteredValue);
    if (e.target.value !== '') {
      const computedValue =
        ((parseInt(e.target.value) - parseInt(minPage)) / (parseInt(maxPage) - parseInt(minPage))) * 100;
      setPassedValue(computedValue);
    } else {
      setPassedValue(0);
    }
  };

  const onClickPrevButton = () => {
    if (parseInt(value) <= 1) {
      return;
    }
    setValue((prev) => (parseInt(prev) - 1).toString());
    const computedValue = ((parseInt(value) - parseInt(minPage)) / (parseInt(maxPage) - parseInt(minPage))) * 100;
    setPassedValue(computedValue);
  };

  const onClickNextButton = () => {
    if (parseInt(value) >= parseInt(maxPage)) {
      return;
    }
    setValue((prev) => (parseInt(prev) + 1).toString());
    const computedValue = ((parseInt(value) - parseInt(minPage)) / (parseInt(maxPage) - parseInt(minPage))) * 100;
    setPassedValue(computedValue);
  };

  return (
    <RangeWrapper>
      <BubbleIcon className="currentPageBubble" text={value} offset={bubbleIconOffset} />
      <RangeBar
        ref={rangeInputRef}
        type="range"
        min="0"
        max={maxPage}
        step="1"
        onChange={onChangeRangeBar}
        value={value}
        passedValue={passedValue}
      />
      <PrevButtonImg src={prevButton} onClick={onClickPrevButton} />
      <InputPageButton value={value} className="inputPage" onChange={onChangeRangeBar} maxPage={maxPage} />
      <NextButtonImg src={nextButton} onClick={onClickNextButton} />
    </RangeWrapper>
  );
};

export default SlideRange;

const RangeWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  align-items: center;
`;

const BubbleIcon = styled(BubbleBox)<PageValue>`
  position: absolute;
  top: -70%;
  left: ${(props) => props.offset + 0.5}%;

  &::before {
    content: '';
    position: absolute;
    border-top: 0px solid transparent;
    border-left: 12px solid ${(props) => props.theme.colors.secondary2};
    border-right: 12px solid transparent;
    border-bottom: 12px solid transparent;
    left: 35%;
    bottom: -25%;
    z-index: 0;
  }
`;
const RangeBar = styled.input<PassedValue>`
  flex: 1;
  /* width: 60%; */
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

const PrevButtonImg = styled.img`
  cursor: pointer;
`;

const NextButtonImg = styled.img`
  cursor: pointer;
`;
