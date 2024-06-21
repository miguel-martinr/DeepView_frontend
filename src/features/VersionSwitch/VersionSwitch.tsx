import React, { useState } from "react";

import "./VersionSwitchStyles.css";
import { ConfirmationModal } from "../ConfirmationModal/ConfirmationModal";
import { Modal } from "../Modal/Modal";

export type VersionSwitchProps = {
  isOn: boolean;
  toggleVersion: () => void;
};

export const VersionSwitch = ({ isOn, toggleVersion }: VersionSwitchProps) => {

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSpinnerModal, setShowSpinnerModal] = useState(false);
  
  const handleToggle = () => {
    setShowConfirmationModal(true);
  }  

  const onConfirm = () => {
    setShowConfirmationModal(false);
    setShowSpinnerModal(true);
    toggleVersion();
  }

  return (
    <>
      <ConfirmationModal 
        isVisible={showConfirmationModal} 
        onCancel={() => setShowConfirmationModal(false)} 
        onConfirm={onConfirm}>
          <h2>¿Estás seguro?</h2>
          <p>Cambiar la versión de la App te redirigirá fuera de esta página</p>
      </ConfirmationModal>
      <Modal isVisible={showSpinnerModal}>
        <div className="spinner-border text-primary"></div>        
      </Modal>

      <label className={"version-switch" + (isOn ? " on" : " off")}>
        <input
          autoComplete="off"
          checked={isOn}
          onChange={handleToggle}
          className="version-switch-checkbox"
          type="checkbox"
        />
        <div className="version-switch-button" />
        <div className="version-switch-labels d-flex d-align-items-center">
          <span><strong>ON</strong>line</span>
          <span><strong>OFF</strong>line</span>
        </div>
      </label>
    </>
  );
};

