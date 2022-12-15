import React, { useMemo, useState } from 'react';
import { Button, Classes, Intent } from '@blueprintjs/core';
import { Formik, Form, Field } from 'formik';
import PeriodicitySelect from '../InputBindings/PeriodicitySelect';
import { TextInputBinding } from '../InputBindings/TextInputBinding';
import { TextAreaBinding } from '../InputBindings/TextAreaBinding';
import { DateInputBinding } from '../InputBindings/DateInputBinding';
import * as C from './constants';

export const AddEventForm = ({ clickedDate, onModalClose }: C.AddEventFormProps) => {
	const [shouldValidateOnChange, setValidateOnChange] = useState(false);

	const onFormSubmit = (values: C.AddEventFormValues) => {
		console.log(values);
		// onModalClose();
	};

	const initialFormValues = useMemo(() => {
		if (!clickedDate) return C.initialValues;

		return {
			...C.initialValues,
			dateFrom: clickedDate,
			dateTo: clickedDate,
		};
	}, [clickedDate]);

	return (
		<Formik
			enableReinitialize
			initialValues={initialFormValues}
			onSubmit={onFormSubmit}
			validationSchema={C.addEventFormValidationSchema}
			validateOnChange={shouldValidateOnChange}
			validateOnBlur={shouldValidateOnChange}
		>
			{({ handleSubmit, errors, values }) => (
				<Form
					onSubmit={(e: React.FormEvent) => {
						e.preventDefault();
						setValidateOnChange(true);
						handleSubmit();
					}}
				>
					<div className={Classes.DIALOG_BODY}>
						<Field
							name='name'
							label='Nazwa'
							error={errors.name}
							component={TextInputBinding}
						/>
						<Field
							name='description'
							label='Opis'
							error={errors.description}
							component={TextAreaBinding}
						/>

						<div
							style={{
								display: 'flex',
								flexShrink: 1,
								justifyContent: 'space-between',
							}}
						>
							<Field
								name='dateFrom'
								label='Od'
								value={values.dateFrom}
								error={errors.dateFrom}
								component={DateInputBinding}
							/>
							<Field
								name='dateTo'
								label='Do'
								value={values.dateTo}
								error={errors.dateTo}
								component={DateInputBinding}
							/>
						</div>

						<Field
							name='periodicity'
							label='Cykliczność'
							error={errors.periodicity}
							component={PeriodicitySelect}
						/>
					</div>
					<div className={Classes.DIALOG_FOOTER}>
						<div className={Classes.DIALOG_FOOTER_ACTIONS}>
							<Button onClick={onModalClose}>Anuluj</Button>
							<Button
								type='submit'
								disabled={Object.keys(errors).length > 0}
								intent={Intent.SUCCESS}
							>
								Zatwierdź
							</Button>
						</div>
					</div>
				</Form>
			)}
		</Formik>
	);
};
