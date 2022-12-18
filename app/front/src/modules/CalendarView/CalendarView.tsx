import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// FULLCALENDAR EXTENSIONS
import FullCalendar, { DatesSetArg, EventClickArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import rrulePlugin from '@fullcalendar/rrule';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'; // needed for dayClick

import './bootstrap-theme/bootstrap.min.css';
import { AddEventModal } from '../AddEventModal/AddEventModal';
import * as C from './constants';

const CalendarView = () => {
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);
	const [clickedDate, setClickedDate] = useState<Date>();

	// to initially render calendar in previously seen view (not always in dayGridMonth)
	const initialView = localStorage.getItem('calendarView') || 'dayGridMonth';

	const handleDateClick = (clickedDate: DateClickArg) => {
		setClickedDate(clickedDate.date);
		setIsOpen(true);
	};

	const onEventClick = (eventInfo: EventClickArg) => {
		console.log(eventInfo.event._def);

		if (eventInfo.event.id) {
			navigate(eventInfo.event.id, { relative: 'path' });
		}
	};

	const onViewChange = (datesSet: DatesSetArg) => {
		localStorage.setItem('calendarView', datesSet.view.type);
	};

	return (
		<div>
			<AddEventModal isOpen={isOpen} clickedDate={clickedDate} setIsOpen={setIsOpen} />
			<div
				style={{
					width: '80%',
					height: '80%',
					margin: 'auto',
				}}
			>
				<FullCalendar
					// PLUGINS AND EVENTS CONFIG
					plugins={[dayGridPlugin, interactionPlugin, listPlugin, rrulePlugin]}
					events={C.mockedEvents}
					// CLICK AND CHANGE HANDLERS
					dateClick={handleDateClick}
					eventClick={onEventClick}
					datesSet={onViewChange}
					// VIEW SETTINGS
					initialView={initialView}
					themeSystem='bootstrap'
					headerToolbar={{
						left: 'prev,next today',
						center: 'title',
						right: 'dayGridMonth,dayGridWeek,listMonth',
					}}
					// LOCALIZATION SETTINGS
					locale={'pl'}
					firstDay={1}
					views={{
						dayGridMonth: { buttonText: 'miesiąc' },
						dayGridWeek: { buttonText: 'tydzień' },
						listMonth: { buttonText: 'lista' },
					}}
					buttonText={{
						today: 'powrót',
					}}
					allDayText='całodniowe'
					noEventsText='Brak wydarzeń na ten miesiąc'

					// OTHERS
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
