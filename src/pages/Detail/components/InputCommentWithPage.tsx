import React, { useState } from 'react';
import styled from 'styled-components';

import InputComment from './InputComment';
import InputPageButton from './InputPageButton';

type InputCommentProps = {
  className: string;
  onClick: () => void;
  placeholder: string;
};

const InputCommentWithPage = ({ className, onClick, placeholder }: InputCommentProps) => {
  //서버에서 받아올 값
  const maxPage = '524';
  const [targetPage, setTargetPage] = useState('0');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setTargetPage(parseInt(e.target.value));
    const enteredValue = e.target.value.replace(/[^0-9.]/g, '');
    setTargetPage(enteredValue);
  };
  return (
    <InputCommentWrapper className={className} placeholder={placeholder} onClick={onClick}>
      <InputPageWrapper>
        <span>책 페이지</span>
        <InputPageButton value={targetPage} className="pageInput" onChange={onChange} maxPage={maxPage} />
      </InputPageWrapper>
    </InputCommentWrapper>
  );
};

export default InputCommentWithPage;

const InputCommentWrapper = styled(InputComment)`
  display: flex;
`;

const InputPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-right: 20px;
  margin-right: 20px;
  border-right: 1px solid ${(props) => props.theme.colors.grey4};
  > span {
    font-size: ${(props) => props.theme.fontSize.body02};
    font-weight: ${(props) => props.theme.fontWeight.bold};
  }
`;
