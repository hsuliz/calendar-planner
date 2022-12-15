import { FieldProps } from 'formik';

export type InputBindingProps<Value = string> = FieldProps & {
	label: string;
	placeholder: string;
	value: Value;
	error?: string;
};
