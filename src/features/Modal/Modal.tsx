import React from 'react';
import { createPortal } from 'react-dom';
import './ModalStyles.css';

export type ModalProps = {
  isVisible: boolean;
  children: React.ReactNode;
}

export const Modal = ({isVisible, children}: ModalProps) => {
  if (!isVisible) return null;

  return createPortal(
    <>
      <div className="modal">
        <div className="modal-container">
        {
          children
        }
        </div>
      </div>
    </>,
    document.getElementById('modal')!
  );
}