import React from 'react';
import styled from 'styled-components';

import down from '../../../../assets/icons/down-bk-24.png';
import up from '../../../../assets/icons/up-bk-24.png';
import CommonButton from '../../../../components/CommonButton';

type ToggleProps = {
  className: string;
  onClick: () => void;
  isOpened: boolean;
  replyNumber?: string;
};
const ToggleButton = ({ className, onClick, isOpened, replyNumber }: ToggleProps) => {
  return (
    <ToggleBtnWrapper className={className} onClick={onClick}>
      답글 {replyNumber}
      <img src={isOpened ? up : down} />
    </ToggleBtnWrapper>
  );
};

export default ToggleButton;

const ToggleBtnWrapper = styled(CommonButton)`
  padding: 6px 12px;
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: ${(props) => props.theme.fontSize.body02};
  border: none;
  background-color: ${(props) => props.theme.colors.grey5};
  > img {
    height: 12px;
    margin-left: 6px;
  }
  ${(props) => props.theme.media.tablet`
    font-size: ${(props: any) => props.theme.fontSize.badge02}
  `}
`;
