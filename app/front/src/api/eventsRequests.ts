import axios, { AxiosError } from 'axios';
import moment from 'moment';
import { EventSourceInput } from '@fullcalendar/react';
import { Event, EventDetails, User } from './apiModels';
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
	return events?.map((event) => ({
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
	})) ?? [];
}

export type EventsApiReturnValue = {
	events: Event[];
}

export const getEvents = async (token: string): Promise<EventSourceInput> => {
	try {
		const { data } = await axios.get<EventsApiReturnValue>('/event', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		
		return mapEventsToFullCalendarFormat(data.events || []);
	} catch {
		return [];
	}
}

export const getEvent = async (eventId: string, token: string): Promise<EventDetails | null> => {
	try {
		const { data } = await axios.get<EventDetails>(`/event/${eventId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	
		return data;
	} catch {
		return null;
	}
}

export const deleteEvent = async (eventId: string, token: string): Promise<boolean> => {
	try {
		const { status } = await axios.delete(`/event/${eventId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	
		return status === 200;
	} catch {
		return false;
	}
}

export const getSuggestions = async (eventId: string, token: string): Promise<User[] | undefined> => {
	try {
		const { data } = await axios.get<User[]>(`/event/${eventId}/suggest`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	
		return data;
	} catch {
		return undefined;
	}
}

interface AddUserReturnValue {
	success: boolean;
	failureReason?: string;
}

export const addUserToEvent = async (
	eventId: string,
	userEmail: string,
	token: string,
): Promise<AddUserReturnValue> => {
	try {
		await axios.post(`/event/${eventId}/user`, {
			email: userEmail,
		}, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	
		return {
			success: true,
		};
	} catch (e: unknown) {
		if (e instanceof AxiosError) {
			return {
				success: false,
				failureReason: e.response?.data.errorMessage,
			};
		}
		return {
			success: false,
			failureReason: 'Wystąpił błąd, spróbuj ponownie później',
		}
	}
}

export const removeUserFromEvent = async (
	eventId: string,
	userEmail: string,
	token: string,
): Promise<AddUserReturnValue> => {
	try {
		await axios.delete(`/event/${eventId}/user`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			data: {
				email: userEmail,
			},
		});
	
		return {
			success: true,
		};
	} catch (e: unknown) {
		if (e instanceof AxiosError) {
			return {
				success: false,
				failureReason: e.response?.data.errorMessage,
			};
		}
		return {
			success: false,
			failureReason: 'Wystąpił błąd, spróbuj ponownie później',
		}
	}
}