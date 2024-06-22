import { useState } from 'react'
import { VideoStatus } from '../../types/Video';

export type useRerocessProps = {
  handleProcess: () => void;
  handleStopProcessing: () => void;
}

export const useReprocess = ({ handleProcess, handleStopProcessing }: useRerocessProps) => {
  const [showReprocessModal, setShowReprocessModal] = useState(false);

  const handleReprocess = () => {
    setShowReprocessModal(true);
  }

  return {
    showReprocessModal,

    handleConfirmReprocess: () => {
      handleProcess();
      setShowReprocessModal(false);
    },

    handleCancelReprocess: () => {
      setShowReprocessModal(false);
    },

    handleReprocess,

    getProcessingHandler: (videoStatus: VideoStatus) => {
      switch (videoStatus) {
        case 'processing': return handleStopProcessing;
        case 'processed': return handleReprocess;
        default: return handleProcess;
      }
    }
  }
}