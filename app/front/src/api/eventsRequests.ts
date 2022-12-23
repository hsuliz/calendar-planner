import axios, { AxiosError } from 'axios';
import moment from 'moment';
import { EventSourceInput } from '@fullcalendar/react';
import { Event } from './apiModels';
import { AddEventFormValues } from '../modules/AddEventForm/constants';

export interface AddEventFormData {
	name: string;
	description: string;
	dateFrom: string;
	dateTo: string;
	periodicity: string;
	until?: string;
	isPublic: boolean;
}

const formatDateToString = (date: Date) => moment(date).format('YYYY-MM-DDTHH:mm:ss');

export const mapFormValuesToPostData = (
	formValues: AddEventFormValues
): AddEventFormData => ({
	name: formValues.name,
	description: formValues.description,
	dateFrom: formatDateToString(formValues.dateFrom),
	dateTo: formatDateToString(formValues.dateTo),
	periodicity: formValues.periodicity,
	until: formValues.until ? formatDateToString(formValues.until) : undefined,
	isPublic: formValues.isPublic,
});

interface PostFormDataReturnValue {
	isSuccess: boolean;
	failureReason?: string;
}

export const postFormData = async (
	formValues: AddEventFormValues,
	token: string
): Promise<PostFormDataReturnValue> => {
	const formData = mapFormValuesToPostData(formValues);

	try {
		await axios.post('/event', formData, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return {
			isSuccess: true,
		};
	} catch (e: unknown) {
		if (e instanceof AxiosError) {
			return {
				isSuccess: false,
				failureReason: e.response?.data.failureReason || 'Błąd serwera',
			};
		}

		return {
			isSuccess: false,
			failureReason: 'Nieznany błąd :-(',
		};
	}
};

export const mapEventsToFullCalendarFormat = (events: Event[]): EventSourceInput => {
	return events.map((event) => ({
		title: event.name,
		id: String(event.id),
		start: event.dateFrom,
		end: event.dateTo,
		...(event.periodicity === 'once' ? {} : ({
			rrule: {
				freq: event.periodicity,
				dtstart: event.dateFrom,
				until: event.until,
			}
		}))
	}))
}

export const getEvents = async (token: string): Promise<EventSourceInput> => {
	const { data } = await axios.get<Event[]>('/event', {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return mapEventsToFullCalendarFormat(data);
}

export const getEvent = async (eventId: string, token: string): Promise<Event> => {
	const { data } = await axios.get<Event>(`/event/${eventId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return data;
}
