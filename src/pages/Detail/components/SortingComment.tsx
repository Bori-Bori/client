import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import sortCommentAtom from '../../../recoil/sortComment';
import SlideButton from './SlideButton';
import SlideRange from './SlideRange';

const SortingComment = () => {
  const [sortIsLatest, setSortIsLatest] = useRecoilState(sortCommentAtom);
  return (
    <SortingCommentContainer>
      <SlideButton state={sortIsLatest} setState={setSortIsLatest} />
      {sortIsLatest ? null : <SlideRange />}
    </SortingCommentContainer>
  );
};

export default SortingComment;

const SortingCommentContainer = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
`;
