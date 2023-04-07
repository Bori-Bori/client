import React, { useState } from 'react';
import styled from 'styled-components';
import { slideRangeValueAtom, sortCommentAtom } from '../../../../recoil/sortComment';
import { useRecoilState, useRecoilValue } from 'recoil';
import { commentListAtom, nextCommentListAtom } from '../../../../recoil/comment';

type SlideType = {
  latestSort: boolean;
};

const SlideButton = () => {
  const [sortIsLatest, setSortIsLatest] = useRecoilState(sortCommentAtom);

  const slideHandler = () => {
    setSortIsLatest((prev) => !prev);
  };

  return (
    <BtnWrapper>
      <CheckBox type="checkbox" id="toggleBtn" onChange={slideHandler} />
      <ButtonLabel htmlFor="toggleBtn" latestSort={sortIsLatest} />
    </BtnWrapper>
  );
};

export default SlideButton;

const BtnWrapper = styled.div`
  display: flex;
  z-index: 0;
`;

const CheckBox = styled.input`
  display: none;
`;

const ButtonLabel = styled.label<SlideType>`
  cursor: pointer;
  position: relative;
  z-index: 10;
  width: 11rem;
  height: 3rem;
  border-radius: 2em;
  background-color: ${(props) => props.theme.colors.grey5};

  /* 선택X 텍스트 */
  ::before {
    display: flex;
    position: absolute;
    content: '최신 댓글 순';
    padding-left: 1em;
    justify-content: flex-start;
    align-items: center;
    width: 9rem;
    height: 3rem;
    color: ${(props) => props.theme.colors.grey1};
    font-size: ${(props) => props.theme.fontSize.body02};
    font-weight: ${(props) => props.theme.fontWeight.regular};
    line-height: ${(props) => props.theme.lineHeight.lh20};
    transition: all 0.2s ease-in-out;
  }
  /* 선택X 원 */
  ::after {
    display: flex;
    position: relative;
    content: '페이지 순';
    width: 5.5rem;
    height: 3rem;
    justify-content: center;
    align-items: center;
    left: 5.5rem;
    font-weight: ${(props) => props.theme.fontWeight.bold};
    font-size: ${(props) => props.theme.fontSize.body02};
    line-height: ${(props) => props.theme.lineHeight.lh20};
    border-radius: 2rem;
    background: ${(props) => props.theme.colors.white};
    box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.16);
    transition: all 0.2s ease-in-out;
  }
  /* 선택O 텍스트, 원 */
  ${(props) =>
    props.latestSort &&
    `
    &::before {
      padding-right: 1rem;
      content: '페이지 순';
      justify-content: flex-end;
    };
    &::after {
      content: '최신 댓글 순';
      width: 5.5rem;
      height: 3rem;
      left: 0rem;
    }
  `}
`;
