import React, { SetStateAction } from 'react';
import styled from 'styled-components';

type PaginationPropsType = {
  pageLength: number;
  curPage: number;
  setCurPage: React.Dispatch<SetStateAction<number>>;
};
const ReplyPagination = ({ pageLength, curPage, setCurPage }: PaginationPropsType) => {
  const onClickDecrease = () => {
    setCurPage((prev) => prev - 1);
  };

  const onClickIncrease = () => {
    setCurPage((prev) => prev + 1);
  };

  return (
    <PaginationContainer>
      <PaginationWrapper>
        <PaginationButton onClick={onClickDecrease} disabled={curPage === 0}>
          &lt;
        </PaginationButton>
        {Array(pageLength)
          .fill(0)
          .map((_, i) => (
            <PaginationNumber key={i} onClick={() => setCurPage(i)} disabled={curPage === i}>
              {i + 1}
            </PaginationNumber>
          ))}
        <PaginationButton onClick={onClickIncrease} disabled={curPage === pageLength - 1}>
          &gt;
        </PaginationButton>
      </PaginationWrapper>
    </PaginationContainer>
  );
};

export default ReplyPagination;

const PaginationContainer = styled.section`
  position: relative;
  width: 100%;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  padding-top: 20px;
  margin-bottom: 44px;
`;
const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: calc(100%-240px);
`;

const PaginationButton = styled.button`
  border-radius: 50%;

  margin: 0 5px;
  font-weight: ${(props) => props.theme.fontWeight.bold};
  :hover {
    color: ${(props) => props.theme.colors.black};
    font-weight: ${(props) => props.theme.fontWeight.bold};
    background-color: ${(props) => props.theme.colors.secondary2};
  }
`;

const PaginationNumber = styled.button`
  border-radius: 50%;
  color: ${(props) => props.theme.colors.grey1};
  margin: 0 5px;
  :hover {
    color: ${(props) => props.theme.colors.black};
    font-weight: ${(props) => props.theme.fontWeight.bold};
    background-color: ${(props) => props.theme.colors.secondary2};
  }
  :disabled {
    color: ${(props) => props.theme.colors.black};
    font-weight: ${(props) => props.theme.fontWeight.bold};
    background-color: ${(props) => props.theme.colors.secondary2};
  }
`;
