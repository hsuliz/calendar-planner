import dayjs from 'dayjs';
import * as yup from 'yup';
import { periodicitySelectItems } from '../InputBindings/PeriodicitySelect';

export type AddEventFormField = 'name' | 'description' | 'dateFrom' | 'dateTo' | 'periodicity';
export type AddEventFormValues = Record<AddEventFormField, string | Date | object>;

export const initialValues: AddEventFormValues = {
    name: '',
    description: '',
    dateFrom: new Date(),
    dateTo: new Date(),
    periodicity: periodicitySelectItems[0].value,
};

export const addEventFormValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required('To pole jest wymagane')
    .min(2, 'Nazwa jest za krótka')
    .max(20, 'Nazwa jest za długa'),
  description: yup
    .string()
    .min(2, 'Opis jest za krótki')
    .max(300, 'Opis jest za długi'),
  dateFrom: yup
    .date()
    .required('To pole jest wymagane') 
    .min(dayjs(new Date()).subtract(1, 'minute').toDate(), 'Nie można podać daty z przeszłości'),
  dateTo: yup
    .date()
    .required('To pole jest wymagane')
    .min(dayjs(new Date()).subtract(1, 'minute').toDate(), 'Nie można podać daty z przeszłości'),
  periodicity: yup.string().required(),
});

export interface AddEventFormProps {
    className?: string;
    onModalClose: () => void;
}

