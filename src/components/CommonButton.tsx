import React, { ReactNode } from 'react';
import styled from 'styled-components';

type ButtonProps = {
  className: string;
  onClick?: () => void;
  children?: ReactNode;
  disabled?: boolean;
};

const CommonButton = ({ className, onClick, children }: ButtonProps) => {
  return (
    <ButtonWrapper type="button" className={className} onClick={onClick}>
      {children}
    </ButtonWrapper>
  );
};

export default CommonButton;

const ButtonWrapper = styled.button`
  display: flex;
  outline: none;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  font-family: inherit;
`;
