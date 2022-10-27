import React from 'react';

import { ReactNode } from 'react';
import styled from 'styled-components';

type ButtonChidren = {
  className: string;
  onClick: () => void;
  children?: ReactNode;
};

const Button = ({ className, onClick, children }: ButtonChidren) => {
  return (
    <ButtonWrapper className={className} onClick={onClick}>
      {children}
    </ButtonWrapper>
  );
};

export default Button;

const ButtonWrapper = styled.button`
  display: flex;
  outline: none;
  border: none;
  align-items: center;
  border-radius: 20px;
`;
