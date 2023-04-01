import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';

import { sortCommentAtom } from '../../../../recoil/sortComment';
import SlideButton from './SlideButton';
import SlideRange from './SlideRange';

const SortingComment = () => {
  const sortIsLatest = useRecoilValue(sortCommentAtom);
  return (
    <SortingCommentContainer>
      <SlideButton />
      {!sortIsLatest && <SlideRange />}
    </SortingCommentContainer>
  );
};

export default SortingComment;

const SortingCommentContainer = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  ${(props) => props.theme.media.tablet`
    display: flex;
    flex-direction: column;
    padding: 0 20px;
  `}
`;
