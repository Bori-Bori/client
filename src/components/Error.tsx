import React from 'react';
import styled from 'styled-components';
import error from '../assets/icons/common_error_gr_60.png';
const Error = () => {
  return (
    <ErrorMsg>
      <img src={error} alt="에러 아이콘" />
      <p>불러들이지 못했습니다. 새로고침을 해주세요.</p>
    </ErrorMsg>
  );
};

export default Error;

const ErrorMsg = styled.div`
  width: 100%;
  padding: 80px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  text-align: center;
  margin: 1.25rem 0;
  color: ${(props) => props.theme.colors.grey1};
  font-weight: ${(props) => props.theme.fontWeight.regular};
  font-size: ${(props) => props.theme.fontSize.body01};
`;
