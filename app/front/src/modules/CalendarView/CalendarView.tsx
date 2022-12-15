import React, { useState } from 'react';
import FullCalendar, { EventClickArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'; // needed for dayClick
import { AddEventModal } from '../AddEventModal/AddEventModal';
import './bootstrap-theme/bootstrap.min.css';

const CalendarView = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleDateClick = (args: DateClickArg) => {
		console.log(args);
		setIsOpen(true);
	};

	const onEventClick = (eventInfo: EventClickArg) => {
		console.log(eventInfo.event._def);
		console.log(eventInfo.event.id);

		// navigate to /:id
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
					plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
					initialView='dayGridMonth'
					events={[
						{
							title: 'event 1',
							id: 'hash1',
							start: '2022-12-01T16:00:00',
							end: '2022-12-01T20:00:00',
						},
						{ title: 'event 2', date: '2022-12-02' },
					]}
					headerToolbar={{
						left: 'prev,next today',
						center: 'title',
						right: 'dayGridMonth,dayGridWeek,listMonth',
					}}
					views={{
						dayGridMonth: { buttonText: 'miesiąc' },
						dayGridWeek: { buttonText: 'tydzień' },
						listMonth: { buttonText: 'lista miesiąc' },
					}}
					dateClick={handleDateClick}
					eventClick={onEventClick}
					locale={'pl'}
					firstDay={1}
					buttonText={{
						today: 'powrót',
					}}
					themeSystem='bootstrap'
					// eventContent={renderEventContent}
				/>
			</div>
		</div>
	);
};

// it may be useful at some point, now its not

// function renderEventContent(eventInfo: EventContentArg) {
// 	return (
// 		<div>
// 			{/* <b>{eventInfo.timeText}</b> */}
// 			<i>{eventInfo.event.title}</i>
// 		</div>
// 	);
// }

export default CalendarView;
