import React, { ReactNode } from 'react';
import ReactDom from 'react-dom';
import styled from 'styled-components';

type ModalProps = {
  onClick?: () => void;
  children: ReactNode;
};

const Modal = ({ onClick, children }: ModalProps) => {
  return (
    <Backdrop onClick={onClick}>
      <ModalOverlay>{children}</ModalOverlay>
    </Backdrop>
  );
};
export default Modal;

export const ModalPortal = ({ children }: ModalProps) => {
  const portalElement = document.getElementById('modal')!;
  return ReactDom.createPortal(children, portalElement);
};

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.6);
  z-index: 50;
`;

const ModalOverlay = styled.div`
  width: 50%;
  padding: 2.5rem;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 12px;
  z-index: 100;
`;
