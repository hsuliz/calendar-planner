import React, { useMemo, useState } from 'react';
import { Button, Classes, Intent } from '@blueprintjs/core';
import { Tooltip2 } from '@blueprintjs/popover2';
import { Formik, Form, Field } from 'formik';
import PeriodicitySelect from '../InputBindings/PeriodicitySelect';
import { TextInputBinding } from '../InputBindings/TextInputBinding';
import { TextAreaBinding } from '../InputBindings/TextAreaBinding';
import { DateInputBinding } from '../InputBindings/DateInputBinding';
import { CheckboxBinding } from '../InputBindings/CheckboxBinding';
import { postFormData } from '../../api/eventsRequests';
import { useAuth } from '../../contexts/useAuth';
import * as C from './constants';
import * as P from './parts';

export const AddEventForm = ({ clickedDate, onModalClose }: C.AddEventFormProps) => {
	const [shouldValidateOnChange, setValidateOnChange] = useState(false);
	const [isFormSubmitting, setIsSubmitting] = useState(false);
	const { token } = useAuth();

	const onFormSubmit = async (values: C.AddEventFormValues) => {
		setIsSubmitting(true);
		const { isSuccess, failureReason } = await postFormData(values, token);
		console.log(isSuccess, failureReason);

		setIsSubmitting(false);
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

						<P.DateInputsWrapper>
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
						</P.DateInputsWrapper>

						<Field
							name='periodicity'
							label='Cykliczność'
							error={errors.periodicity}
							component={PeriodicitySelect}
						/>

						{values.periodicity !== 'once' && (
							<Field
								name='until'
								label='Data zakończenia (opcjonalnie)'
								value={values.until}
								error={errors.until}
								component={DateInputBinding}
							/>
						)}
						<P.PublicCheckboxWrapper>
							<Field
								name='isPublic'
								label='Wydarzenie publiczne?'
								error={errors.isPublic}
								component={CheckboxBinding}
							/>
							<Tooltip2
								usePortal={false}
								content='Wydarzenie publiczne to takie, w którym może brać udział wiele osób. Po utworzeniu takiego wydarzenia, dostaniesz możliwość zaproszenia dodatkowych uczestników'
							>
								<Button icon='info-sign' minimal small />
							</Tooltip2>
						</P.PublicCheckboxWrapper>
					</div>
					<div className={Classes.DIALOG_FOOTER}>
						<div className={Classes.DIALOG_FOOTER_ACTIONS}>
							<Button onClick={onModalClose}>Anuluj</Button>
							<Button
								type='submit'
								disabled={Object.keys(errors).length > 0}
								intent={Intent.SUCCESS}
								loading={isFormSubmitting}
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
