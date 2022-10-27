import React from 'react';
import styled from 'styled-components';

import down from '../../../assets/icons/down-bk-24.png';
import up from '../../../assets/icons/up-bk-24.png';
import Button from '../../../components/Button';

type ToggleProps = {
  className: string;
  onClick: () => void;
  isOpened: boolean;
};
const ToggleButton = ({ className, onClick, isOpened }: ToggleProps) => {
  return (
    <ToggleBtnWrapper className={className} onClick={onClick}>
      + 12
      <img src={isOpened ? up : down} />
    </ToggleBtnWrapper>
  );
};

export default ToggleButton;

const ToggleBtnWrapper = styled(Button)`
  padding: 6px 12px;
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: ${(props) => props.theme.fontSize.body02};
  > img {
    height: 12px;
    margin-left: 6px;
  }
`;
