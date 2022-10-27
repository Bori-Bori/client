import React from 'react';
import styled from 'styled-components';

type BubbleProps = {
  text: string;
};
const Bubble = () => {
  return <BubbleContainer>sdfsd</BubbleContainer>;
};

export default Bubble;

const BubbleContainer = styled.div`
  display: inline-block;
  position: relative;
  height: 32px;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: ${(props) => props.theme.fontSize.badge01};
  line-height: ${(props) => props.theme.lineHeight.lh22};
  background-color: ${(props) => props.theme.colors.secondary2};
  &::after {
    content: '';
    position: absolute;
    border-top: 8px solid transparent;
    border-left: 12px solid ${(props) => props.theme.colors.secondary2};
    border-right: 0px solid transparent;
    border-bottom: 5px solid transparent;
    top: 8px;
    left: 95%;
  }
`;
