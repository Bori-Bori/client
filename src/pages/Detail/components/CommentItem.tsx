import React, { useState } from 'react';
import styled from 'styled-components';

import ToggleButton from './ToggleButton';

const CommentItem = () => {
  const [commentIsOpened, setCommentIsOpened] = useState(false);
  const commentOpenHandler = () => {
    setCommentIsOpened((prev) => !prev);
  };
  return (
    <CommentItemWrapper>
      <li>
        <UserImage />
      </li>
      <CommentInfo>
        <span>노래하는 라이언</span>
        <span>22.10.22 16:23</span>
      </CommentInfo>
      <CommentText>
        대통령은 전시·사변 또는 이에 준하는 국가비상사태에 있어서 병력으로써 군사상의 필요에 응하거나 공공의 안녕질서를
        유지할 필요가 있을 때에는 법률이 정하는 바에 의하여 계엄을 선포할 수 있다.정당의 설립은 자유이며, 복수정당제는
        보장된다. 정부는 예산에 변경을 가할 필요가 있을 때에는 추가경정예산안을 편성하여 국회에 제출할 수 있다. 대통령의
        국법상 행위는 문서로써 하며, 이 문서에는 국무총리와 관계 국무위원이 부서한다. 군사에 관한 것도 또한 같다.
      </CommentText>
      <ToggleButton className="toggleButton" onClick={commentOpenHandler} isOpened={commentIsOpened} />
    </CommentItemWrapper>
  );
};

export default CommentItem;

const CommentItemWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 20px 0;
  li {
    list-style: none;
  }
`;

const UserImage = styled.img`
  /* data 받아오기 전 img 대용 styling*/
  width: 52px;
  height: 52px;
  background-color: grey;
  border-radius: 50%;
`;
const CommentInfo = styled.li`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
  font-size: ${(props) => props.theme.fontSize.body02};
  line-height: ${(props) => props.theme.lineHeight.lh20};
  > span:first-child {
    font-weight: ${(props) => props.theme.fontWeight.bold};
  }
`;

const CommentText = styled.li`
  /* width: 70%; */
  flex: 1;
  word-wrap: break-word;
  margin: 0 40px 0 50px;
  font-size: ${(props) => props.theme.fontSize.body02};
`;
