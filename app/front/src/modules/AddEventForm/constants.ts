import moment from 'moment';
import * as yup from 'yup';
import { periodicitySelectItems } from '../InputBindings/PeriodicitySelect';

// prettier-ignore
export type AddEventFormField =  'name' | 'description' | 'dateFrom' | 'dateTo' | 'periodicity' | 'until' | 'isPublic';

export type AddEventFormValues = Record<
	AddEventFormField,
	string | Date | boolean | undefined
>;

export const initialValues: Partial<AddEventFormValues> = {
	name: '',
	description: '',
	dateFrom: new Date(),
	dateTo: new Date(),
	periodicity: periodicitySelectItems[0].value,
	isPublic: false,
};

export const addEventFormValidationSchema = yup.object().shape({
	name: yup
		.string()
		.required('To pole jest wymagane')
		.min(2, 'Nazwa jest za krótka')
		.max(30, 'Nazwa jest za długa'),
	description: yup.string().max(300, 'Opis jest za długi'),
	dateFrom: yup
		.date()
		.required('To pole jest wymagane')
		.min(
			moment(new Date()).subtract(1, 'minute').toDate(),
			'Nie można podać daty z przeszłości'
		),
	dateTo: yup
		.date()
		.required('To pole jest wymagane')
		.min(
			moment(new Date()).subtract(1, 'minute').toDate(),
			'Nie można podać daty z przeszłości'
		),
	periodicity: yup.string().required(),
	until: yup.date().optional().min(new Date(), 'Nie można podać daty z przeszłości'),
	isPublic: yup.boolean().optional(),
});

export interface AddEventFormProps {
	clickedDate: Date | undefined;
	onModalClose: () => void;
}
