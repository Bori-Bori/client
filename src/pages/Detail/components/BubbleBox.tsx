import React from 'react';
import styled from 'styled-components';

type BubbleProps = {
  text: string;
  className: string;
};

const BubbleBox = ({ text, className }: BubbleProps) => {
  return <BubbleContainer className={className}>{text}</BubbleContainer>;
};

export default BubbleBox;

const BubbleContainer = styled.div`
  display: inline-block;
  position: relative;
  height: 32px;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: ${(props) => props.theme.fontSize.badge01};
  line-height: ${(props) => props.theme.lineHeight.lh20};
  background-color: ${(props) => props.theme.colors.secondary2};

`;
