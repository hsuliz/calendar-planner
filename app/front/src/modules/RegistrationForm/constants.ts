import * as yup from 'yup';

// prettier-ignore
export type RegistrationFormField = 'email' | 'firstName' | 'lastName' | 'password' | 'acceptTerms';

//prettier-ignore
export type RegistrationFormValues = (
   Record<Exclude<RegistrationFormField, 'acceptTerms'>, string>
   & Record<'acceptTerms', boolean>
)

export const initialValues: RegistrationFormValues = {
	email: '',
	firstName: '',
	lastName: '',
	password: '',
	acceptTerms: false,
};

const emailRegex =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const registrationFormValidationSchema = yup.object().shape({
	email: yup
		.string()
		.required('E-mail jest wymagany')
		.max(30, 'E-mail jest za długi')
		.matches(emailRegex, 'E-mail jest w niepoprawnym formacie'),
	password: yup
		.string()
		.required('Hasło jest wymagane')
		.min(6, 'Hasło jest za krótkie')
		.max(20, 'Hasło jest za długie'),
	firstName: yup
		.string()
		.required('Imię jest wymagane')
		.min(2, 'Imię jest za krótkie')
		.max(20, 'Imię jest za długie')
		.matches(/[A-Z]{1}\S+/, 'Imię jest w nieprawidłowej postaci'),
	lastName: yup
		.string()
		.required('Nazwisko jest wymagane')
		.min(2, 'Nazwisko jest za krótkie')
		.max(20, 'Nazwisko jest za długie')
		.matches(/[A-Z]{1}\S+/, 'Nazwisko jest w nieprawidłowej postaci'),
	acceptTerms: yup.boolean().oneOf([true], 'Musisz zaakceptować regulamin'),
});
