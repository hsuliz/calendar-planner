import { EventSourceInput } from '@fullcalendar/react';

export const mockedEvents: EventSourceInput = [
	{
		title: 'event 1',
		id: 'hash1',
		start: '2022-12-01T16:00:00',
		end: '2022-12-01T20:00:00',
	},
	{ title: 'event 2', date: '2022-12-02', id: 'hash2' },
	{
		title: 'Cotygodniowy',
		id: 'hash3',
		rrule: {
			freq: 'weekly',
			dtstart: '2022-12-08T10:30:00',
			until: '2023-01-12',
		},
	},
];
