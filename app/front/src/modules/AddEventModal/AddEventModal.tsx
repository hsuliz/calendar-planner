import { Button, Classes, Dialog, Intent } from '@blueprintjs/core';
import React from 'react';
import { AddEventForm } from './AddEventForm';

interface AddEventModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const AddEventModal = ({ isOpen, setIsOpen }: AddEventModalProps) => {
  const handleClose = () => {
    setIsOpen(false);
  };

  const onConfirm = () => {
    // temporarily
    handleClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} title="Dodaj wydarzenie">
        <AddEventForm className={Classes.DIALOG_BODY} />
      <DialogFooter onClose={handleClose} onConfirm={onConfirm} />
    </Dialog>
  );
};

interface DialogFooterProps {
  onClose: (e: React.MouseEvent) => void;
  onConfirm: () => void;
}

function DialogFooter({ onClose, onConfirm }: DialogFooterProps) {
  return (
    <div className={Classes.DIALOG_FOOTER}>
      <div className={Classes.DIALOG_FOOTER_ACTIONS}>
        <Button onClick={onClose}>Anuluj</Button>
        <Button onClick={onConfirm} intent={Intent.SUCCESS}>Zatwierdź</Button>
      </div>
    </div>
  );
}
