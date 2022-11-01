import React, { ReactNode } from 'react';
import ReactDom from 'react-dom';
import styled from 'styled-components';

type ModalProps = {
  className?: string;
  onClick?: () => void;
  children: ReactNode;
};

const Modal = ({ className, onClick, children }: ModalProps) => {
  return (
    <Backdrop className={className} onClick={onClick}>
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
  background-color: rgba(255, 255, 255, 0.349);
  z-index: 50;
`;

const ModalOverlay = styled.div`
  position: relative;
  display: inline-block;
  top: 20vh;
  margin: 0 auto;
  padding: 100px 80px 40px;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 12px;
  z-index: 100;
  box-sizing: border-box;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.12);
`;
