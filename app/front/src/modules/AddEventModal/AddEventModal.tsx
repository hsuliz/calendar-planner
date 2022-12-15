import React from 'react';
import { Classes, Dialog } from '@blueprintjs/core';
import { AddEventForm } from '../AddEventForm/AddEventForm';

interface AddEventModalProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}

export const AddEventModal = ({ isOpen, setIsOpen }: AddEventModalProps) => {
	const handleModalClose = () => {
		setIsOpen(false);
	};

	return (
		<Dialog
			className='bp4-dark'
			isOpen={isOpen}
			onClose={handleModalClose}
			title='Dodaj wydarzenie'
		>
			<AddEventForm className={Classes.DIALOG_BODY} onModalClose={handleModalClose} />
		</Dialog>
	);
};
