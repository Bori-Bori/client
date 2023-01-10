import React, { useState, useRef, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import InputPageButton from '../components/InputPageButton';
import prevButton from '../../../assets/icons/prv-bk-20.png';
import nextButton from '../../../assets/icons/nxt-bk-20.png';
import BubbleBox from '../components/BubbleBox';
import { slideRangeValueAtom } from '../../../recoil/sortComment';

type PassedValue = {
  passedValue: number;
};

type PageValue = {
  offset: number;
};

const SlideRange = () => {
  const minPage = '1';
  const maxPage = '524'; //server에서 받아올 값
  const [rangeValue, setRangeValue] = useRecoilState(slideRangeValueAtom);
  const [passedValue, setPassedValue] = useState(0);
  let rangeInputWidth;
  let enteredValue = '';

  const [bubbleIconOffset, setBubbleIconOffset] = useState(0);
  const rangeInputRef = useRef<HTMLInputElement>(null);

  // 말풍선 위치
  useEffect(() => {
    setTimeout(() => {
      rangeInputWidth = rangeInputRef.current!.clientWidth;
      setBubbleIconOffset((parseInt(rangeValue) / rangeInputWidth) * 83);
    }, 1);
  }, [rangeInputRef, rangeInputWidth, rangeValue]);

  const onChangeRangeBar = (e: React.ChangeEvent<HTMLInputElement>) => {
    enteredValue = e.target.value.replace(/[^0-9.]/g, '');
    if (enteredValue === '') {
      setPassedValue(0);
      setRangeValue('0');
      return;
    }
    setRangeValue(enteredValue);

    const computedValue =
      ((parseInt(enteredValue) - parseInt(minPage)) / (parseInt(maxPage) - parseInt(minPage))) * 100;

    setPassedValue(computedValue);
  };

  useEffect(() => {
    if (rangeValue.length > 1 && rangeValue[0] === '0') {
      const newrangeValue = rangeValue.slice(1);
      setRangeValue(newrangeValue);
    }
  }, [rangeValue]);

  //PrevButton
  const onClickPrevButton = () => {
    if (parseInt(rangeValue) <= 0) {
      return;
    }
    setRangeValue((prev) => (parseInt(prev) - 1).toString());
    const computedValue = ((parseInt(rangeValue) - parseInt(minPage)) / (parseInt(maxPage) - parseInt(minPage))) * 100;
    setPassedValue(computedValue);
  };

  //NextButton
  const onClickNextButton = () => {
    if (parseInt(rangeValue) >= parseInt(maxPage)) {
      return;
    }
    setRangeValue((prev) => (parseInt(prev) + 1).toString());
    const computedValue = ((parseInt(rangeValue) - parseInt(minPage)) / (parseInt(maxPage) - parseInt(minPage))) * 100;
    setPassedValue(computedValue);
  };

  return (
    <RangeWrapper>
      <BubbleIcon className="currentPageBubble" text={rangeValue} offset={bubbleIconOffset} />
      <RangeBar
        ref={rangeInputRef}
        type="range"
        min="0"
        max={maxPage}
        step="1"
        onChange={onChangeRangeBar}
        value={rangeValue}
        passedValue={passedValue}
      />
      <PrevButtonImg src={prevButton} onClick={onClickPrevButton} />
      <InputPageButton value={rangeValue} className="inputPage" onChange={onChangeRangeBar} maxPage={maxPage} />
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
  left: ${(props) => props.offset + 2.5}%;

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
  margin: 0 20px;
`;

const PrevButtonImg = styled.img`
  cursor: pointer;
`;

const NextButtonImg = styled.img`
  cursor: pointer;
`;
