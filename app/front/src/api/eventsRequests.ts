import axios, { AxiosError } from 'axios';
import moment from 'moment';
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

const formatDateToString = (date: Date) => moment(date).format('YYYY-MM-DDTHH:MM:mm:SSS');

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
		await axios.post('/events', formData, {
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
