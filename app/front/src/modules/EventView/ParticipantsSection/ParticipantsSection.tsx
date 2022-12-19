import React, { useState } from 'react';
import { Button, Classes, Dialog, Intent } from '@blueprintjs/core';
import UsersSuggest from '../../UsersSuggest/UsersSuggest';
import { mockParticipants } from './constants';
import ParticipantsTable from './ParticipantsTable';
import * as P from './parts';

interface ParticipantsSectionProps {
	isOwner: boolean;
}

const ParticipantsSection = ({ isOwner }: ParticipantsSectionProps) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedParticipantEmail, setParticipantEmail] = useState('');

	const onRemoveDialogClose = () => {
		setIsDialogOpen(false);
	};

	const onRemoveParticipant = (participantMail: string) => () => {
		console.log('remove dude with mail = ', participantMail);
		setParticipantEmail(participantMail);
		setIsDialogOpen(true);
	};

	return (
		<div>
			<Dialog
				className={Classes.DARK}
				isOpen={isDialogOpen}
				title='Uwaga!'
				onClose={onRemoveDialogClose}
			>
				<div className={Classes.DIALOG_BODY}>
					<h4>
						Chcesz usunąć użytkownika <b>{selectedParticipantEmail}</b> z listy
						uczestników?
					</h4>
					<div style={{ display: 'flex', gap: 5 }}>
						<Button intent={Intent.NONE} minimal fill onClick={onRemoveDialogClose}>
							Anuluj
						</Button>
						<Button fill intent={Intent.DANGER}>
							Potwierdzam, usuń
						</Button>
					</div>
				</div>
			</Dialog>

			<h3>Zaproś użytkowników</h3>
			<P.InvitationSectionWrapper>
				<UsersSuggest />
				<span>lub</span>
				<Button minimal intent={Intent.PRIMARY} icon='clipboard'>
					Skopiuj link zapraszający
				</Button>
			</P.InvitationSectionWrapper>

			<h3>Lista uczestników</h3>

			<ParticipantsTable
				participants={mockParticipants}
				editable={isOwner}
				onRemoveParticipant={onRemoveParticipant}
			/>
		</div>
	);
};

export default ParticipantsSection;
