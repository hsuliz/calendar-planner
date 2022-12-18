import React from 'react';
import UsersSuggest from '../../UsersSelect/UsersSuggest';
import { mockParticipants } from './constants';
import ParticipantsTable from './ParticipantsTable';

interface ParticipantsSectionProps {
	isOwner: boolean;
}

const ParticipantsSection = ({ isOwner }: ParticipantsSectionProps) => {
	const onRemoveParticipant = (participantMail: string) => () => {
		console.log('remove dude with mail = ', participantMail);
	};

	return (
		<div>
			<h3>Zaproś użytkowników</h3>
			<div
				style={{
					display: 'flex',
					flexShrink: 1,
					flexDirection: 'column',
					justifyContent: 'space-between',
				}}
			>
				<UsersSuggest />
				<span>lub Skopiuj link zapraszający</span>
			</div>

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
