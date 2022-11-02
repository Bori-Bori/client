import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';

import CommonButton from '../../../components/CommonButton';

type InputPageProps = {
  className: string;
  // value: number;
  value: string;
  maxPage: string;
  // setValue : React.Dispatch<React.SetStateAction<number>>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputPageButton = ({ className, value, maxPage, onChange }: InputPageProps) => {
  // const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setValue(parseInt(e.target.value));
  // };
  return (
    <InputPage className={className}>
      <input placeholder="숫자 입력" value={value} onChange={onChange} />
      p. / {maxPage}
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
    width: 35px;
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
