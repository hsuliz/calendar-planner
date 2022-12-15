import React, { useState } from 'react';
import FullCalendar, { DatesSetArg, EventClickArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'; // needed for dayClick
import { AddEventModal } from '../AddEventModal/AddEventModal';
import './bootstrap-theme/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const mockedEvents = [
	{
		title: 'event 1',
		id: 'hash1',
		start: '2022-12-01T16:00:00',
		end: '2022-12-01T20:00:00',
	},
	{ title: 'event 2', date: '2022-12-02', id: 'hash2' },
];

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
					plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
					events={mockedEvents}
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
