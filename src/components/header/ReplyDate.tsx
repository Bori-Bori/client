import React from 'react';
import styled from 'styled-components';
interface date {
  date: string;
}
const ReplyDate = ({ date }: date) => {
  const replyDate = date.slice(2, 16).split('T').join(' ').replaceAll('-', '.');
  return <ReplyDateWrap>{replyDate}</ReplyDateWrap>;
};

export default ReplyDate;

const ReplyDateWrap = styled.span`
  font-weight: ${(props) => props.theme.fontWeight.regular};
  font-size: ${(props) => props.theme.fontSize.badge01};
  color: ${(props) => props.theme.colors.grey1};
  margin-right: 4px;
`;
