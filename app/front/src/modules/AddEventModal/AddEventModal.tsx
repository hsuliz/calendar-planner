import React from 'react';
import { Classes, Dialog } from '@blueprintjs/core';
import { AddEventForm } from '../AddEventForm/AddEventForm';

interface AddEventModalProps {
	isOpen: boolean;
	clickedDate: Date | undefined;
	setIsOpen: (isOpen: boolean) => void;
}

export const AddEventModal = ({ isOpen, clickedDate, setIsOpen }: AddEventModalProps) => {
	const handleModalClose = () => {
		setIsOpen(false);
	};

	return (
		<Dialog
			className={Classes.DARK}
			isOpen={isOpen}
			onClose={handleModalClose}
			title='Dodaj wydarzenie'
			canEscapeKeyClose={false}
		>
			<AddEventForm clickedDate={clickedDate} onModalClose={handleModalClose} />
		</Dialog>
	);
};
