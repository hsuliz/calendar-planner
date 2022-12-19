import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as P from './parts';
import * as C from './constants';
import {
	Button,
	Callout,
	Classes,
	Dialog,
	Divider,
	Intent,
	Tag,
	TextArea,
} from '@blueprintjs/core';
import moment from 'moment';
import PeriodicityTag from './PeriodicityTag';
import ParticipantsSection from './ParticipantsSection/ParticipantsSection';

// TODO: zweryfikować czy użytkownik może zobaczyć dany event (jeśli nie to robimy redirect na /kalendarz)

const EventView = (props: C.EventViewProps) => {
	const { id: eventId } = useParams();
	const { name, description, dateFrom, dateTo, periodicity, isPublic, isOwner } =
		C.mockEventInfo;
	const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);

	const onRemoveEvent = () => {
		setIsRemoveDialogOpen(true);
		console.log('remove event with ID: ', eventId);
	};

	const onCloseDialog = () => {
		setIsRemoveDialogOpen(false);
	};

	return (
		<P.EventInfoWrapper className={Classes.DARK}>
			<P.TitleSpan>
				<Button icon='edit' />
				<h1>{name}</h1>
				<Link to='..' relative='path'>
					Powrót{' '}
				</Link>
			</P.TitleSpan>
			<TextArea readOnly fill value={description} style={{ resize: 'none' }} />

			<P.EventTimeFrameWrapper>
				<h4>
					Początek wydarzenia: {moment(dateFrom).format(C.dateFormat)}{' '}
					<Tag intent={Intent.PRIMARY} round>
						{moment(dateFrom).format(C.dayNameFormat)}
					</Tag>
				</h4>
				<h4>
					Koniec wydarzenia: {moment(dateTo).format(C.dateFormat)}
					<Tag intent={Intent.PRIMARY} round>
						{moment(dateTo).format(C.dayNameFormat)}
					</Tag>
				</h4>
			</P.EventTimeFrameWrapper>

			<PeriodicityTag periodicity={periodicity} />

			{isPublic && (
				<>
					<Divider />
					<ParticipantsSection isOwner={isOwner} />
				</>
			)}

			{isOwner && (
				<>
					<Divider />

					<Button icon='remove' onClick={onRemoveEvent} intent={Intent.DANGER} fill>
						Usuń wydarzenie
					</Button>
					<Dialog
						className={Classes.DARK}
						isOpen={isRemoveDialogOpen}
						onClose={onCloseDialog}
						isCloseButtonShown
						title='Uwaga!'
					>
						<Callout intent={Intent.DANGER}>
							<p>Czy chcesz usunąć to wydarzenie? Tej akcji nie można cofnąć!</p>

							<Button fill intent={Intent.DANGER}>
								Potwierdzam usunięcie
							</Button>
						</Callout>
					</Dialog>
				</>
			)}
		</P.EventInfoWrapper>
	);
};

export default EventView;