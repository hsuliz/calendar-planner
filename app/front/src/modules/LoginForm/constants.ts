import * as yup from 'yup';

export type LoginFormField = 'email' | 'password';
export type LoginFormValues = Record<LoginFormField, string>;

export const initialValues: LoginFormValues = {
	email: '',
	password: '',
};

const emailRegex =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const loginFormValidationSchema = yup.object().shape({
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
});
