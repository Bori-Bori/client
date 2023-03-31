import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useRecoilState } from 'recoil';

import InputCommentWithPage from './InputCommentWithPage';
import commentInputHeight from '../../../../recoil/commentInputHeight';

import useIsLogin from '../../../../hooks/useIsLogin';
import closeIcon from '../../../../assets/icons/close-bk-24.png';
import writeIcon from '../../../../assets/icons/write_br_24.png';
import { useAuthContext } from '../../../../context/useAuthContext';

type inputIsOpenType = {
  inputIsOpen: boolean;
};

const ToggleInputComment = () => {
  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const [inputHeight, setInputHeight] = useRecoilState(commentInputHeight);
  const [inputIsOpen, setInputIsOpen] = useState(false);
  const { user }: any = useAuthContext();

  //로그인 유무 확인
  useIsLogin();

  //댓글창 열림 유무에 따른 여백 조절
  useEffect(() => {
    inputHeight && inputWrapperRef.current?.clientHeight ? setInputHeight(inputWrapperRef.current!.clientHeight) : '';
  }, [inputHeight]);

  const ToggleInputHandler = () => {
    setInputIsOpen((prev) => !prev);
    setTimeout(() => {
      const inputHeight = inputWrapperRef.current?.clientHeight || 0;
      setInputHeight(inputHeight);
    }, 1);
  };

  return (
    <CommnetInputContainer inputIsOpen={inputIsOpen}>
      {!inputIsOpen && (
        <WriteCommentBtn onClick={ToggleInputHandler} inputIsOpen={inputIsOpen}>
          <img src={writeIcon} />
          <span>댓글쓰기</span>
        </WriteCommentBtn>
      )}
      {inputIsOpen && (
        <InputWrapper ref={inputWrapperRef} inputIsOpen={inputIsOpen}>
          <InputTitle>
            <span>댓글쓰기</span>
            <img src={closeIcon} onClick={ToggleInputHandler} />
          </InputTitle>
          <InputCommentWithPage className="input" placeholder={user ? '댓글을 입력하세요' : '로그인 후 이용해주세요'} />
        </InputWrapper>
      )}
    </CommnetInputContainer>
  );
};

export default ToggleInputComment;

const InputFadeIn = keyframes`
  from {
    opacity: 0;
  } to {
    opacity: 1;
  }
`;

const InputFadeOut = keyframes`
from {
  opacity: 1;
} to {
  opacity: 0;
}
`;

const CommnetInputContainer = styled.article<inputIsOpenType>`
  position: fixed;
  bottom: ${(props) => (props.inputIsOpen ? '0px' : '-100px')};
  left: 50%;
  transform: translateX(-50%);
  width: inherit;
  max-width: 1024px;
  z-index: 100;
  box-shadow: 0px -4px 8px rgba(0, 0, 0, 0.08);
  padding: 17px 24px;
  background-color: ${(props) => props.theme.colors.white};
  transition: all 0.5s linear;
  ${(props) => props.theme.media.tablet`
    display: none;
  `}
`;

const InputWrapper = styled.div<inputIsOpenType>`
  ${(props) =>
    props.inputIsOpen
      ? css`
          animation: ${InputFadeIn} 0.6s linear forwards;
        `
      : css`
          animation: ${InputFadeOut} 0.6s linear forwards;
        `}
  ${(props) => props.theme.media.tablet`
    display: none;
  `}
`;

const WriteCommentBtn = styled.div<inputIsOpenType>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 68px;
  height: 68px;
  top: -200px;
  right: 30px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.primary};
  opacity: ${(props) => (props.inputIsOpen ? 0 : 1)};
  ${(props) =>
    props.inputIsOpen
      ? css`
          animation: ${InputFadeOut} 0.6s linear forwards;
        `
      : css`
          animation: ${InputFadeIn} 0.6s linear forwards;
        `}

  > img {
    width: 17px;
  }
  > span {
    margin-top: 5px;
    color: #643c00;
    font-size: ${(props) => props.theme.fontSize.badge01};
    font-weight: ${(props) => props.theme.fontWeight.bold};
    cursor: pointer;
  }
  ${(props) => props.theme.media.tablet`
    display: none;
  `}
`;

const InputTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${(props) => props.theme.fontSize.body01};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  box-sizing: border-box;
  margin-bottom: 12px;
`;
