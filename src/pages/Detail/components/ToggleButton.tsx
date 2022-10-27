import React from 'react';
import styled from 'styled-components';

import down from '../../../assets/icons/down-bk-24.png';
import up from '../../../assets/icons/up-bk-24.png';

type ToggleProps = {
  onClick: () => void;
  isOpened: boolean;
};
const ToggleButton = ({ onClick, isOpened }: ToggleProps) => {
  return (
    <ToggleBtnWrapper onClick={onClick}>
      +12
      <img src={isOpened ? up : down} />
    </ToggleBtnWrapper>
  );
};

export default ToggleButton;

const ToggleBtnWrapper = styled.button`
  display: flex;
  padding: 6px 12px;
  border-radius: 20px;
  outline: none;
  border: none;
  align-items: center;
  font-size: ${(props) => props.theme.fontSize.body02};
  > img {
    height: 12px;
    margin-left: 6px;
  }
`;
