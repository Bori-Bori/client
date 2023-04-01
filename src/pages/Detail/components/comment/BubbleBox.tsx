import React, { forwardRef } from 'react';
import styled from 'styled-components';

type BubbleProps = {
  text: string;
  className: string;
  ref: React.RefObject<HTMLDivElement>;
};

const BubbleBox = React.forwardRef<HTMLDivElement, BubbleProps>(({ text, className }, ref) => {
  return (
    <BubbleContainer ref={ref} className={className}>
      {text}p.
    </BubbleContainer>
  );
});

BubbleBox.displayName = 'BubbleBox';

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
