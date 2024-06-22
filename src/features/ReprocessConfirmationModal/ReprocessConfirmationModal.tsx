import React from 'react';
import './ReprocessConfirmationModalStyles.css';
import { ConfirmationModal } from '../ConfirmationModal/ConfirmationModal';

export type ReprocessConfirmationModalProps = {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;  
};

export const ReprocessConfirmationModal = ({ isVisible, onConfirm, onCancel }: ReprocessConfirmationModalProps) => {
  
  return (
    <ConfirmationModal 
      isVisible={isVisible}
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      <h2>¿Estás seguro?</h2>
      <p>
        Este vídeo ya ha sido procesado anteriormente. 
        Si inicias el procesamiento de nuevo, todos los datos
        anteriores serán sobrescritos.
      </p>      
    </ConfirmationModal>
  )
}