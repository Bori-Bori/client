import React from 'react';
import styled from 'styled-components';

const Error = () => {
  return <ErrorMsg>에러가 발생했습니다.</ErrorMsg>;
};

export default Error;

const ErrorMsg = styled.div`
  width: 100%;
  text-align: center;
  margin: 1.25rem 0;
`;
