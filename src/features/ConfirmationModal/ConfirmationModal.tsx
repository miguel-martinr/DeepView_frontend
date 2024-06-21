import React from 'react';
import './ConfirmationModalStyles.css';
import { Modal } from '../Modal/Modal';

export type ConfirmationModalProps = {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  children: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
};

export const ConfirmationModal = ({ isVisible, onConfirm, onCancel, children, confirmText, cancelText }: ConfirmationModalProps) => {

  const _confirmText = confirmText || 'Aceptar';
  const _cancelText = cancelText || 'Cancelar';

  return (
    <Modal isVisible={isVisible}>
      {children}
      <div className="modal-actions">
        <button onClick={onConfirm} className="btn btn-primary">{ _confirmText }</button>
        <button onClick={onCancel} className="btn btn-secondary">{ _cancelText }</button>
      </div>
    </Modal>
  )
}