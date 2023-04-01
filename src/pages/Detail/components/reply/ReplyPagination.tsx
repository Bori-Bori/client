import React, { SetStateAction } from 'react';
import styled from 'styled-components';

type PaginationPropsType = {
  pageLength: number;
  curPage: number;
  setCurPage: React.Dispatch<SetStateAction<number>>;
};
const ReplyPagination = ({ pageLength, curPage, setCurPage }: PaginationPropsType) => {
  const PAGE_SIZE = 10; // the number of items per page
  const onClickDecrease = () => {
    setCurPage((prev) => prev - 1);
  };

  const onClickIncrease = () => {
    setCurPage((prev) => prev + 1);
  };

  const pages = Array.from(Array(pageLength), (_, i) => i + 1);

  // calculate the start and end indexes of the visible pages
  const startIndex = Math.floor(curPage / PAGE_SIZE) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  const visiblePages = pages.slice(startIndex, endIndex);

  return (
    <PaginationContainer>
      <PaginationWrapper>
        <PaginationButton onClick={onClickDecrease} disabled={curPage === 0}>
          &lt;
        </PaginationButton>
        {visiblePages.map((pageNumber) => (
          <PaginationNumber
            key={pageNumber}
            onClick={() => setCurPage(pageNumber - 1)}
            disabled={curPage === pageNumber - 1}
          >
            {pageNumber}
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
  ${(props) => props.theme.media.tablet`
    margin-bottom: 0px;
  `}
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
  :disabled {
    cursor: default;
  }
`;

const PaginationNumber = styled.button`
  border-radius: 50%;
  color: ${(props) => props.theme.colors.grey1};
  margin: 0 5px;
  width: 24px;
  height: 24px;
  :disabled {
    color: ${(props) => props.theme.colors.black};
    font-weight: ${(props) => props.theme.fontWeight.bold};
    background-color: ${(props) => props.theme.colors.secondary2};
  }
`;
