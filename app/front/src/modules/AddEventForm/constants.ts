import moment from 'moment';
import * as yup from 'yup';
import {
	periodicitySelectItems,
	PeriodicityType,
} from '../InputBindings/PeriodicitySelect';

// prettier-ignore
export type AddEventFormField =  'name' | 'description' | 'dateFrom' | 'dateTo' | 'periodicity' | 'until' | 'isPublic';

export interface AddEventFormValues {
	name: string;
	description: string;
	dateFrom: Date;
	dateTo: Date;
	periodicity: PeriodicityType;
	until?: Date;
	isPublic: boolean;
}

export const initialValues: AddEventFormValues = {
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
		)
		.max(
			new Date(new Date().setFullYear(2050)),
			'Nie wybiegajmy za daleko w przyszłość'
		),
	dateTo: yup
		.date()
		.required('To pole jest wymagane')
		.min(
			moment(new Date()).subtract(1, 'minute').toDate(),
			'Nie można podać daty z przeszłości'
		)
		.max(
			new Date(new Date().setFullYear(2050)),
			'Nie wybiegajmy za daleko w przyszłość'
		)
		.when('dateFrom', (dateFrom, field) => {
			return field.min(
				dateFrom,
				'Wydarzenie nie może się skończyć przed rozpoczęciem!'
			);
		}),
	periodicity: yup.string().required(),
	until: yup
		.date()
		.optional()
		.min(new Date(), 'Nie można podać daty z przeszłości')
		.max(
			new Date(new Date().setFullYear(2050)),
			'Nie wybiegajmy za daleko w przyszłość'
		)
		.when('dateFrom', (dateFrom, field) => {
			return field.min(
				dateFrom,
				'Wydarzenie nie może się skończyć przed rozpoczęciem!'
			);
		}),
	isPublic: yup.boolean().optional(),
});

export interface AddEventFormProps {
	clickedDate: Date | undefined;
	onModalClose: () => void;
}
