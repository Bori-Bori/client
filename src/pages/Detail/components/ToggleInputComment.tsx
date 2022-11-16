import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import InputCommentWithPage from './InputCommentWithPage';

import upIcon from '../../../assets/icons/up-bk-24.png';
import closeIcon from '../../../assets/icons/close-bk-24.png';

const ToggleInputComment = () => {
  const [inputIsOpen, setInputIsOpen] = useState(false);

  const ToggleInputHandler = () => {
    setInputIsOpen((prev) => !prev);
  };
  return (
    <InputWrapper>
      <InputTitle onClick={ToggleInputHandler}>
        <span>댓글쓰기</span>
        {inputIsOpen ? <img src={closeIcon} /> : <img src={upIcon} />}
      </InputTitle>
      {inputIsOpen && (
        <InputCommentWithPage
          className="input"
          onClick={() => {
            console.log('sa');
          }}
          placeholder="댓글을 입력하세요"
        />
      )}
    </InputWrapper>
  );
};

export default ToggleInputComment;

const InputWrapper = styled.article`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: inherit;
  max-width: 1024px;
  z-index: 100;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: 0px -4px 8px rgba(0, 0, 0, 0.08);
  padding: 17px 24px;
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
