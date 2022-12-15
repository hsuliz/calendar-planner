import React from 'react';
import { Link, useParams } from 'react-router-dom';

interface EventViewProps {}

const EventView = (props: EventViewProps) => {
	const { id: eventId } = useParams();

	// TODO: useQuery, w którym będą pobierane z api dane dla eventu o podanym ID

	return (
		<div className='App-header'>
			<h1>Widok eventu</h1>

			<h3>ID: {eventId}</h3>

			<Link to='..' relative='path'>
				Powrót{' '}
			</Link>
		</div>
	);
};

export default EventView;
