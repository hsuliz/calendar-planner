import React from 'react';
import { Button, Classes, Intent } from '@blueprintjs/core';
import { User } from '../../../api/apiModels';

interface ParticipantsTableProps {
	participants: User[];
	editable: boolean;
	onRemoveParticipant?: (participantMail: string) => () => void;
}

const ParticipantsTable = ({
	participants,
	editable,
	onRemoveParticipant,
}: ParticipantsTableProps) => {
	return (
		<table
			className={[Classes.HTML_TABLE, Classes.HTML_TABLE_STRIPED].join(' ')}
			style={{ width: '100%' }}
		>
			<thead>
				<tr>
					{editable && <th />}
					<th>Imię i Nazwisko</th>
					<th>E-mail</th>
				</tr>
			</thead>
			<tbody>
				{participants.map((user) => (
					<tr key={user.email}>
						{editable && (
							<td>
								<Button
									icon='remove'
									intent={Intent.DANGER}
									onClick={
										onRemoveParticipant
											? onRemoveParticipant(user.email)
											: undefined
									}
								/>
							</td>
						)}
						<td>
							{user.firstName} {user.lastName}
						</td>
						<td>{user.email}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default ParticipantsTable;
