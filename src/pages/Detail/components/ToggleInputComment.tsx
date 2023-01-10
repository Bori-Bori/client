import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import InputCommentWithPage from './InputCommentWithPage';
import commentInputHeight from '../../../recoil/commentInputHeight';

import upIcon from '../../../assets/icons/up-bk-24.png';
import closeIcon from '../../../assets/icons/close-bk-24.png';

const ToggleInputComment = () => {
  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const [inputHeight, setInputHeight] = useRecoilState(commentInputHeight);
  const [inputIsOpen, setInputIsOpen] = useState(false);

  useEffect(() => {
    setInputHeight(inputWrapperRef.current!.clientHeight);
  }, []);

  const ToggleInputHandler = () => {
    setInputIsOpen((prev) => !prev);
    setTimeout(() => {
      setInputHeight(inputWrapperRef.current!.clientHeight);
    }, 1);
  };

  return (
    <InputWrapper ref={inputWrapperRef}>
      <InputTitle onClick={ToggleInputHandler}>
        <span>댓글쓰기</span>
        {inputIsOpen ? <img src={closeIcon} /> : <img src={upIcon} />}
      </InputTitle>
      {inputIsOpen && (
        <InputCommentWithPage
          className="input"
          onClick={() => {
            // 클릭했을 때 댓글등록 api 요청이 가야됨.. onClick을 여기서 만들어서 안 전해주고 밑에서 만들어도 되지 않나?
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
