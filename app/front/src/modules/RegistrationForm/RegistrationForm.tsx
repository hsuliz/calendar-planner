import React, { useContext, useState } from 'react';
import { Button, Callout, Intent } from '@blueprintjs/core';
import * as P from './parts';
import { Formik, Form, Field } from 'formik';
import * as C from './constants';
import { TextInputBinding } from '../InputBindings/TextInputBinding';
import { PasswordInputBinding } from '../InputBindings/PasswordInputBinding';
import { Link, Navigate } from 'react-router-dom';
import { registrationRequest } from '../../api/requests';
import { AuthContext } from '../../contexts/AuthContext';
import { CheckboxBinding } from '../InputBindings/CheckboxBinding';

function RegistrationForm() {
	const { isLoggedIn, setIsLoggedIn, setToken } = useContext(AuthContext);
	const [shouldValidateOnChange, setValidateOnChange] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [wasFormTouched, setWasFormTouched] = useState(false);
	const [formError, setFormError] = useState(''); // here we keep error message from API
	const [formSuccess, setFormSuccess] = useState(false); // here we only mark if form submitting was successful

	if (isLoggedIn && !wasFormTouched) {
		// only if user enters /login page manually
		return <Navigate to='/kalendarz' replace={true} />;
	}

	const onFormChange = () => {
		if (!wasFormTouched) {
			setWasFormTouched(true);
		}

		if (formError) {
			setFormError('');
		}
	};

	const onFormSubmit = async (values: C.RegistrationFormValues) => {
		console.log(values);

		setIsSubmitting(true);

		const {
			success,
			token = '',
			failureReason = '',
		} = await registrationRequest(
			values.firstName,
			values.lastName,
			values.email,
			values.password
		);

		setIsSubmitting(false);

		// Success scenario
		if (success) {
			setToken(token);
			setFormSuccess(true);
			setIsLoggedIn(true);
			return;
		}

		// Failure scenario
		setFormError(failureReason);
	};

	return (
		<Formik
			initialValues={C.initialValues}
			onSubmit={onFormSubmit}
			validationSchema={C.registrationFormValidationSchema}
			validateOnChange={shouldValidateOnChange}
			validateOnBlur={shouldValidateOnChange}
		>
			{({ handleSubmit, errors }) => (
				<Form
					onChange={onFormChange}
					onSubmit={(e: React.FormEvent) => {
						e.preventDefault();
						setValidateOnChange(true);
						handleSubmit();
					}}
				>
					<P.LoginFormWrapper className='bp4-dark'>
						<Field
							name='firstName'
							label='Imię'
							placeholder='Imię...'
							error={errors.firstName}
							component={TextInputBinding}
						/>

						<Field
							name='lastName'
							label='Nazwisko'
							placeholder='Nazwisko...'
							error={errors.lastName}
							component={TextInputBinding}
						/>

						<Field
							name='email'
							label='E-mail'
							placeholder='E-mail...'
							error={errors.email}
							component={TextInputBinding}
						/>

						<Field
							name='password'
							label='Hasło'
							placeholder='Hasło...'
							error={errors.password}
							component={PasswordInputBinding}
						/>

						<Field
							name='acceptTerms'
							label='Akceptuję regulamin'
							error={errors.acceptTerms}
							component={CheckboxBinding}
						/>

						<Button
							type='submit'
							intent={Intent.PRIMARY}
							loading={isSubmitting}
							fill
						>
							Utwórz konto
						</Button>
						<P.StyledLink to='/login'>
							<Button type='button' outlined fill>
								Mam już konto
							</Button>
						</P.StyledLink>

						{formError && (
							<Callout intent={Intent.DANGER} title='Wystąpił błąd'>
								{formError}
							</Callout>
						)}

						{formSuccess && (
							<Callout intent={Intent.SUCCESS} title='Sukces!'>
								Utworzono konto!{' '}
								<Link to='/kalendarz'>Przejdź do kalendarza.</Link>
							</Callout>
						)}
					</P.LoginFormWrapper>
				</Form>
			)}
		</Formik>
	);
}

export default RegistrationForm;
