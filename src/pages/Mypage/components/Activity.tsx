import React, { useState } from 'react';
import styled from 'styled-components';

import CommentIcon from '../../../assets/icons/comment-gr-60.png';
import BookmarkIcon from '../../../assets/icons/common_bookmark_gr_60.png';
type isActivityType = {
  isActivity: boolean;
};

const Activity = () => {
  const [isActivity, setIsActivity] = useState(true);
  const onClickMyActivity = () => {
    setIsActivity(true);
  };
  const onClickMyList = () => {
    setIsActivity(false);
  };
  return (
    <ActivityContainer>
      <div>
        <MyActivity onClick={onClickMyActivity} isActivity={isActivity}>
          {' '}
          내 활동 도서{' '}
        </MyActivity>
        <MyList onClick={onClickMyList} isActivity={isActivity}>
          {' '}
          찜 목록{' '}
        </MyList>
      </div>
      {isActivity ? (
        <StatusContainer>
          <img src={CommentIcon} />
          <span>댓글을 남긴 도서가 없어요.</span>
        </StatusContainer>
      ) : (
        <StatusContainer>
          <img src={BookmarkIcon} />
          <span>찜한 도서가 없어요.</span>
        </StatusContainer>
      )}
    </ActivityContainer>
  );
};

export default Activity;

const ActivityContainer = styled.section`
  padding: 30px 24px 0;
`;
const MyActivity = styled.span<isActivityType>`
  position: relative;
  font-size: ${(props) => props.theme.fontSize.header01};
  line-height: ${(props) => props.theme.lineHeight.lh26};
  margin-right: 32px;
  cursor: pointer;
  ::before {
    display: block;
    content: '|';
    position: absolute;
    right: -16px;
    color: ${(props) => props.theme.colors.grey4};
    font-weight: 300;
  }
  ${(props) =>
    props.isActivity
      ? `
      color: black;
      font-weight: bold;
      `
      : `
      color: #9A958B;
      `}
  ${(props) => props.theme.media.tablet`
    font-size: ${(props: any) => props.theme.fontSize.header02};
  `}
`;

const MyList = styled.span<isActivityType>`
  font-size: ${(props) => props.theme.fontSize.header01};
  line-height: ${(props) => props.theme.lineHeight.lh26};
  cursor: pointer;
  ${(props) =>
    props.isActivity
      ? `
      color: #9A958B;
      `
      : `
      color: black;
      font-weight: bold;
      `}

  ${(props) => props.theme.media.tablet`
    font-size: ${(props: any) => props.theme.fontSize.header02};
  `}
`;

const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 145px;
  > span {
    font-size: ${(props) => props.theme.fontSize.body02};
    line-height: ${(props) => props.theme.lineHeight.lh20};
    color: ${(props) => props.theme.colors.grey1};
    margin-top: 20px;
  }
`;
