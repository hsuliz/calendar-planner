import { FieldProps } from 'formik';

export type InputBindingProps = FieldProps & {
	label: string;
	placeholder: string;
	error?: string;
};
