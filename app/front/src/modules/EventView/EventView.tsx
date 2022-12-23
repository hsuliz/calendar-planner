import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
	Button,
	Callout,
	Classes,
	Dialog,
	Divider,
	Intent,
	Tag,
} from '@blueprintjs/core';
import moment from 'moment';
// import { useQuery } from 'react-query';
import PeriodicityTag from './PeriodicityTag';
import ParticipantsSection from './ParticipantsSection/ParticipantsSection';
import DescriptionSection from './DescriptionSection/DescriptionSection';
// import { getEvent } from '../../api/eventsRequests';
// import { useAuth } from '../../contexts/useAuth';
import * as P from './parts';
import * as C from './constants';

// TODO: zweryfikować czy użytkownik może zobaczyć dany event (jeśli nie to robimy redirect na /kalendarz)

const EventView = (props: C.EventViewProps) => {
	const { id: eventId } = useParams();
	const { name, description, dateFrom, dateTo, periodicity, isPublic, isOwner } =
		C.mockEventInfo;
	const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
	// const { token } = useAuth();
	// const { data } = useQuery(['event', eventId], () => getEvent(eventId!, token))
	// console.log(data);

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
			<DescriptionSection description={description} />

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
