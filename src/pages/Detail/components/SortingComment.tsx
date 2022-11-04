import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import SlideButton from './SlideButton';
import SlideRange from './SlideRange';

const SortingComment = () => {
  const [sortIsLatest, setSortIsLatest] = useState(true);
  // useEffect, api요청을 보낼 것
  // api는 apis 디렉터리에서 생성 후에 import 해서 사용할 것
  // 요청은 react query 사용
  // 요청 결과가 오면 그걸 recoil 사용해서 전역으로 다룰 것.
  // CommentItem에 bubble을 조건으로 보여주기로 하고
  // Comment CP는 Comment들 다 담는 CP로 쓸까?
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
