import { FieldProps } from 'formik';

export type InputBindingProps = FieldProps & { label: string; error?: string };