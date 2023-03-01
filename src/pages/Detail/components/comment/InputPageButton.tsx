import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';

import CommonButton from '../../../../components/CommonButton';

type InputPageProps = {
  className: string;
  value: string;
  maxPage: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputPageButton = ({ className, value, maxPage, onChange }: InputPageProps) => {
  return (
    <InputPage className={className}>
      <input placeholder="숫자만 입력" value={value} onChange={onChange} />
      p. / {maxPage}p.
    </InputPage>
  );
};

export default InputPageButton;

const InputPage = styled(CommonButton)`
  padding: 12px 16px;
  border: 1px solid ${(props) => props.theme.colors.grey4};
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.grey1};
  > input {
    width: 65px;
    border: none;
    outline: none;
    font-weight: ${(props) => props.theme.fontWeight.bold};
    text-align: left;
    &::placeholder {
      font-family: inherit;
      font-size: ${(props) => props.theme.fontSize.badge01};
      font-weight: ${(props) => props.theme.fontWeight.bold};
      color: ${(props) => props.theme.colors.grey1};
    }
  }
`;
