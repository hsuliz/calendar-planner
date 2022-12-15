import React, { useState } from 'react';
import FullCalendar, { EventContentArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'; // needed for dayClick
import { AddEventModal } from '../AddEventModal/AddEventModal';
import './bootstrap-theme/bootstrap.min.css';

const CalendarView = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleDateClick = (args: DateClickArg) => {
		console.log(args);
		setIsOpen(true);
	};

	return (
		<div>
			<AddEventModal isOpen={isOpen} setIsOpen={setIsOpen} />
			<div
				style={{
					width: '80%',
					height: '80%',
					margin: 'auto',
				}}
			>
				<FullCalendar
					plugins={[dayGridPlugin, interactionPlugin]}
					// initialView="dayGridWeek"
					initialView='dayGridMonth'
					events={[
						{ title: 'event 1', date: '2022-12-01' },
						{ title: 'event 2', date: '2022-12-02' },
					]}
					dateClick={handleDateClick}
					eventContent={renderEventContent}
					locale={'pl'}
					firstDay={1}
					buttonText={{
						today: 'powrót',
					}}
					themeSystem='bootstrap'
				/>
			</div>
		</div>
	);
};

function renderEventContent(eventInfo: EventContentArg) {
	const onEventClick = () => {
		console.log(eventInfo.event._def);
	};

	return (
		<div onClick={onEventClick}>
			{/* <b>{eventInfo.timeText}</b> */}
			<i>{eventInfo.event.title}</i>
		</div>
	);
}

export default CalendarView;
