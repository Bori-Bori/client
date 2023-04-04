import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import styled from 'styled-components';

import InputPageButton from '../comment/InputPageButton';
import prevButton from '../../../../assets/icons/prv-bk-20.png';
import nextButton from '../../../../assets/icons/nxt-bk-20.png';
import BubbleBox from '../comment/BubbleBox';
import { slideRangeValueAtom } from '../../../../recoil/sortComment';
import { useQuery } from 'react-query';

import { useParams } from 'react-router-dom';
import { getBookInfo } from 'apis/book';

type PassedValue = {
  passedValue: number;
};

const SlideRange = () => {
  const minPage = '1'; // 슬라이드바의 최소값을 1로 지정함
  const [rangeValue, setRangeValue] = useRecoilState(slideRangeValueAtom);
  const [passedValue, setPassedValue] = useState(0); // 슬라이드바의 현재 값
  const bubbleRef = useRef<HTMLDivElement>(null); // 말풍선의 위치
  let enteredValue = ''; // 사용자가 입력한 값이 담길 변수를 선언함
  const rangeInputRef = useRef<HTMLInputElement>(null); // 슬라이드바의 위치
  const params = useParams();
  const isbn = params.id!;
  const contentType = '';
  const { data } = useQuery(['bookinfo', isbn], async () => await getBookInfo(1, contentType, isbn));
  const totalBookPage = data?.item[0].subInfo.itemPage;
  // 말풍선 위치
  useEffect(() => {
    const bubble = bubbleRef.current;
    const inputWidth = rangeInputRef.current?.offsetWidth;
    const thumbWidth = 20;
    if (inputWidth) {
      const left = (+rangeValue / totalBookPage) * (inputWidth - thumbWidth) + thumbWidth / 2;
      bubble!.style.left = `${left}px`;
    }
  }, [rangeValue]);

  // range bar 변경 함수
  const onChangeRangeBar = (e: React.ChangeEvent<HTMLInputElement>) => {
    enteredValue = e.target.value.replace(/[^0-9.]/g, '');
    if (enteredValue === '') {
      setPassedValue(0);
      setRangeValue('0');
      return;
    }
    const computedValue =
      ((parseInt(enteredValue) - parseInt(minPage)) / (parseInt(totalBookPage) - parseInt(minPage))) * 100;

    setRangeValue(enteredValue);
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
    const computedValue =
      ((parseInt(rangeValue) - parseInt(minPage)) / (parseInt(totalBookPage) - parseInt(minPage))) * 100;
    setPassedValue(computedValue);
  };

  //NextButton
  const onClickNextButton = () => {
    if (parseInt(rangeValue) >= parseInt(totalBookPage)) {
      return;
    }
    setRangeValue((prev) => (parseInt(prev) + 1).toString());
    const computedValue =
      ((parseInt(rangeValue) - parseInt(minPage)) / (parseInt(totalBookPage) - parseInt(minPage))) * 100;
    setPassedValue(computedValue);
  };

  return (
    <RangeWrapper>
      <BubbleIcon className="currentPageBubble" text={rangeValue} ref={bubbleRef} />
      <RangeBar
        ref={rangeInputRef}
        type="range"
        min="0"
        max={totalBookPage}
        step="1"
        onChange={onChangeRangeBar}
        value={rangeValue}
        passedValue={passedValue}
      />
      <PrevButtonImg src={prevButton} onClick={onClickPrevButton} />
      <StyledInputPageButton
        value={rangeValue}
        className="inputPage"
        onChange={onChangeRangeBar}
        maxPage={totalBookPage}
      />
      <NextButtonImg src={nextButton} onClick={onClickNextButton} />
      <PageInputMobileWrapper>
        <PageButtonsWrapper>
          <img src={prevButton} onClick={onClickPrevButton} />
          <img src={nextButton} onClick={onClickNextButton} />
        </PageButtonsWrapper>
        <StyledInputPageButtonMobile
          value={rangeValue}
          className="inputPage"
          onChange={onChangeRangeBar}
          maxPage={totalBookPage}
        />
      </PageInputMobileWrapper>
    </RangeWrapper>
  );
};

export default SlideRange;

const RangeWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  align-items: center;
  ${(props) => props.theme.media.tablet`
    flex-direction: column;
    padding-bottom: 20px;
  `}
`;

const BubbleIcon = styled(BubbleBox)`
  position: absolute;
  top: -70%;
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
  ${(props) => props.theme.media.tablet`
    font-size: 11px;
    top: 20px;
  `}
`;
const RangeBar = styled.input<PassedValue>`
  position: relative;
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
  ${(props) => props.theme.media.tablet`
    width: 100%;
    margin: 67px 0 25px;
    ::-webkit-slider-thumb {
      position: relative;
      top: -5px;
    }
    ::-webkit-slider-runnable-track {
      width: 100%;
      height: 12px;
    }
  `}
`;

const PrevButtonImg = styled.img`
  cursor: pointer;
  ${(props) => props.theme.media.tablet`
    display: none;
  `}
`;

const NextButtonImg = styled.img`
  cursor: pointer;
  ${(props) => props.theme.media.tablet`
    display: none;
  `}
`;

const StyledInputPageButton = styled(InputPageButton)`
  ${(props) => props.theme.media.tablet`
    display: none;
  `}
`;

const PageInputMobileWrapper = styled.div`
  display: none;
  ${(props) => props.theme.media.tablet`
  display: flex;
  justify-content: space-between;
  width: 100%;
`}
`;

const StyledInputPageButtonMobile = styled(InputPageButton)`
  display: none;
  ${(props) => props.theme.media.tablet`
    display: block;
    // float: right;
  `}
`;

const PageButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  > img {
    margin-right: 15px;
  }
`;
