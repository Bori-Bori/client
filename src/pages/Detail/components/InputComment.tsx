import React, { ReactNode } from 'react';
import styled from 'styled-components';

import CommonButton from '../../../components/CommonButton';

type InputProps = {
  className: string;
  children?: ReactNode;
  onClick: () => void;
  placeholder: string;
};

const InputComment = ({ className, placeholder, onClick, children }: InputProps) => {
  return (
    <InputWrapper className={className}>
      {children}
      <InputBox placeholder={placeholder} />
      <InputButtonWrapper>
        <InputButton className={className} onClick={onClick}>
          댓글등록
        </InputButton>
      </InputButtonWrapper>
    </InputWrapper>
  );
};

export default InputComment;

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 110px;
  padding: 20px;
  border: 1px solid ${(props) => props.theme.colors.grey4};
  border-radius: 8px;
  position: relative;
  box-sizing: border-box;
`;

const InputBox = styled.textarea`
  flex: 1;
  display: block;
  /* width: 85%; */
  min-height: 70px;
  resize: none;
  outline: none;
  border: none;
  overflow-y: visible;
`;

const InputButtonWrapper = styled.div`
  width: 100px;
`;

const InputButton = styled(CommonButton)`
  position: absolute;
  right: 20px;
  bottom: 20px;
  padding: 12px 16px;
  background-color: ${(props) => props.theme.colors.primary};
  border: none;
  font-size: ${(props) => props.theme.fontSize.body02};
  font-weight: ${(props) => props.theme.fontWeight.bold};
`;
